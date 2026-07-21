# Frontend `/api/v1` Repoint (Base-Bypass) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Point the centralized API client at the backend's new `/api/v1` namespace while keeping the handful of self-versioned backend routes (photos, payments, users, domain-check) addressing their own root paths — via an explicit per-call base-bypass, not string-munging at each call site.

**Architecture:** The client prepends a single configurable base (`VITE_API_BASE_URL`) to every request path. We set that base to `/api/v1` and add an `absolute` opt-out on `request()`/`uploadFile()` for the four routes the backend deliberately keeps at root. The Vite dev proxy is reworked to forward `/api/v1/*` and the self-versioned roots verbatim (no path rewriting). This ships safely during the backend's dual-mount window: root paths still work, so a stale deployed build keeps functioning until this build rolls out.

**Tech Stack:** React 19 + TypeScript (strict) + Vite 8, Vitest 4 + MSW (`msw/node`), Playwright e2e.

## Global Constraints

- **Base-bypass approach only.** Self-versioned routes opt out via an `absolute` flag on the client call — never by hand-writing a full URL or a second `fetch` at the call site.
- **Dual-mount safe.** Every change here must work against a backend that still serves resource routes at BOTH root and `/api/v1`. Do NOT assume the root mount is gone (that is a separate, later, backend plan — hard-gated behind this one shipping and deploying).
- **The four self-versioned routes that MUST bypass the base:** `/v2/photos*` (photos), `/v1/payments` (payments), `/check-domain` (domain availability), `/v1/users/me` (user profile). Everything else is a dual-mounted resource route and gets the `/api/v1` base.
- **TypeScript is strict** (`tsc --noEmit` must stay clean). No implicit `any`.
- **Test env note (important):** Vitest runs in `test` mode, so neither `.env.development` nor `.env.production` is loaded; `import.meta.env.VITE_API_BASE_URL` is `undefined` there and `API_BASE` resolves to `''`. Existing `src/api/*.test.ts` MSW handlers use root-relative paths and therefore keep matching unchanged. Do not rewrite those handlers.

---

### Task 1: Add the base-bypass mechanism to the client

**Files:**
- Modify: `src/api/client.ts` (add `absolute?` to `RequestOptions`; thread through `request()` and `uploadFile()`)
- Test: `src/api/client.base.test.ts` (new)

**Interfaces:**
- Consumes: nothing new.
- Produces:
  - `RequestOptions` gains `absolute?: boolean` (default `false`).
  - `request<T>(path, options?)` — when `options.absolute` is true, fetches `path` verbatim; otherwise fetches `` `${API_BASE}${path}` `` (unchanged default).
  - `uploadFile<T>(path, formData, token?, absolute?)` — gains a 4th positional `absolute = false`; same base-vs-verbatim rule.

- [ ] **Step 1: Write the failing test**

Create `src/api/client.base.test.ts`. It stubs a non-empty base (the real dev/prod condition — recall the base is `''` under plain test mode) and re-imports the module so the module-level `API_BASE` picks the stub up.

```ts
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/v1/thing', () => HttpResponse.json({ where: 'prefixed' })),
  http.get('/thing', () => HttpResponse.json({ where: 'root' })),
  http.post('/api/v1/up', () => HttpResponse.json({ where: 'prefixed' })),
  http.post('/up', () => HttpResponse.json({ where: 'root' }))
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.unstubAllEnvs();
  vi.resetModules();
});
afterAll(() => server.close());

async function loadClientWithBase(base: string) {
  vi.stubEnv('VITE_API_BASE_URL', base);
  vi.resetModules();
  return import('./client');
}

describe('API base prefixing', () => {
  it('prepends VITE_API_BASE_URL to normal request paths', async () => {
    const { request } = await loadClientWithBase('/api/v1');
    const r = await request<{ where: string }>('/thing');
    expect(r.where).toBe('prefixed');
  });

  it('bypasses the base for request() when absolute is set', async () => {
    const { request } = await loadClientWithBase('/api/v1');
    const r = await request<{ where: string }>('/thing', { absolute: true });
    expect(r.where).toBe('root');
  });

  it('prepends the base for uploadFile by default', async () => {
    const { uploadFile } = await loadClientWithBase('/api/v1');
    const r = await uploadFile<{ where: string }>('/up', new FormData());
    expect(r.where).toBe('prefixed');
  });

  it('bypasses the base for uploadFile when absolute is set', async () => {
    const { uploadFile } = await loadClientWithBase('/api/v1');
    const r = await uploadFile<{ where: string }>('/up', new FormData(), undefined, true);
    expect(r.where).toBe('root');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/api/client.base.test.ts`
Expected: FAIL — the `absolute` bypass assertions resolve to `'prefixed'` (bypass not implemented yet), or a type error on the unknown `absolute` option.

- [ ] **Step 3: Implement the base-bypass in `src/api/client.ts`**

Add the option to the interface:

```ts
export interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string | undefined;
  // Bypass API_BASE and use `path` verbatim. For backend routes that carry
  // their own version prefix (photos at /v2, payments/users at /v1) and are
  // deliberately NOT mounted under /api/v1.
  absolute?: boolean;
}
```

In `request()`, destructure `absolute` and compute the URL:

```ts
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token, absolute = false } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchInit: RequestInit = {
    method,
    headers,
  };
  if (body !== undefined) {
    fetchInit.body = JSON.stringify(snakeKeysToKebab(body));
  }

  const response = await fetch(absolute ? path : `${API_BASE}${path}`, fetchInit);
  // ... unchanged from here down
```

In `uploadFile()`, add the 4th param and apply the same rule:

```ts
export async function uploadFile<T>(
  path: string,
  formData: FormData,
  token?: string,
  absolute = false
): Promise<T> {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(absolute ? path : `${API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: formData,
  });
  // ... unchanged from here down
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/api/client.base.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Confirm the existing client suites are unaffected**

Run: `npm test -- src/api/client.test.ts src/api/client.extra.test.ts`
Expected: PASS — the default (non-absolute) path is unchanged.

- [ ] **Step 6: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/api/client.ts src/api/client.base.test.ts
git commit -m "feat(api): add absolute base-bypass option to the API client

- request()/uploadFile() gain an \`absolute\` opt-out that fetches the
  path verbatim, skipping VITE_API_BASE_URL
- for backend routes that keep their own version prefix and are not
  mounted under /api/v1 (photos, payments, users, domain-check)"
```

---

### Task 2: Mark the four self-versioned endpoints as base-bypassing

**Files:**
- Modify: `src/api/images.ts` (3 calls: `getImageMetadata`, `addPhoto`, `editPhoto`)
- Modify: `src/api/payments.ts` (2 calls: `getDomainAvailability`, `newPaymentSecret`)
- Modify: `src/api/users.ts` (1 call: `getUserProfile`)
- Test: `src/api/images.test.ts`, `src/api/payments.test.ts`, `src/api/users.test.ts` — **unchanged**, run only to confirm they still pass.

**Interfaces:**
- Consumes: `request(path, { absolute })` and `uploadFile(path, formData, token, absolute)` from Task 1.
- Produces: no signature changes — same exported functions, same return types.

- [ ] **Step 1: Update `src/api/images.ts`**

All three photo calls hit `/v2/photos*`, which the backend keeps at root. Add `absolute: true` (or the 4th positional for `uploadFile`):

```ts
export async function getImageMetadata(token?: string): Promise<Image[]> {
  const entries = await request<PhotoApiEntry[]>('/v2/photos', { token, absolute: true });
  return groupPhotoVersions(entries);
}

export function addPhoto(files: File[], token?: string): Promise<Image[]> {
  const formData = new FormData();
  for (const file of files) {
    formData.append(file.name, file);
  }
  return uploadFile<Image[]>('/v2/photos', formData, token, true);
}

export function editPhoto(payload: EditPhotoPayload, token?: string): Promise<Image> {
  const { photo_id, ...rest } = payload;
  return request<Image>(`/v2/photos/${photo_id}`, {
    method: 'PUT',
    body: rest,
    token,
    absolute: true,
  });
}
```

- [ ] **Step 2: Update `src/api/payments.ts`**

Both calls hit root paths (`/check-domain`, `/v1/payments`) the backend keeps unversioned/self-versioned:

```ts
export function getDomainAvailability(
  domain: string,
  token?: string
): Promise<DomainAvailability> {
  return request<DomainAvailability>(`/check-domain?domain=${encodeURIComponent(domain)}`, {
    token,
    absolute: true,
  });
}

export function newPaymentSecret(
  payment: PaymentPayload,
  token?: string
): Promise<PaymentIntent> {
  return request<PaymentIntent>('/v1/payments', {
    method: 'POST',
    body: payment,
    token,
    absolute: true,
  });
}
```

- [ ] **Step 3: Update `src/api/users.ts`**

`/v1/users/me` is self-versioned and not mounted under `/api/v1`:

```ts
export function getUserProfile(token: string): Promise<UserProfile> {
  return request<UserProfile>('/v1/users/me', { token, absolute: true });
}
```

- [ ] **Step 4: Run the affected suites — they must pass unchanged**

Run: `npm test -- src/api/images.test.ts src/api/payments.test.ts src/api/users.test.ts`
Expected: PASS. (Under test mode `API_BASE` is `''`, so `absolute` is a no-op there; these tests assert behavior, not URLs, and the MSW handlers are root-relative.)

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/api/images.ts src/api/payments.ts src/api/users.ts
git commit -m "feat(api): bypass the /api/v1 base for self-versioned routes

- photos (/v2/photos), payments (/v1/payments), domain-check
  (/check-domain), and user profile (/v1/users/me) pass absolute:true
  so they keep addressing their own root paths after the repoint"
```

---

### Task 3: Repoint the API base to `/api/v1` and rework the dev proxy

**Files:**
- Modify: `.env.development` (`VITE_API_BASE_URL=/api` → `/api/v1`)
- Modify: `.env.production` (`VITE_API_BASE_URL=` → `/api/v1`)
- Modify: `vite.config.ts` (replace the single stripping `/api` proxy with verbatim-forwarding entries)

**Interfaces:**
- Consumes: the `absolute` bypass (Tasks 1–2) — without it, this task would break the four self-versioned routes in dev/prod.
- Produces: the running app fetches resource routes at `/api/v1/*` and the four self-versioned routes at their own roots.

**Why the proxy changes:** the old proxy matched `/api` and *stripped* it (`rewrite: path.replace(/^\/api/, '')`), forwarding `/api/compositions` → backend `/compositions`. With the base now `/api/v1`, a normal call becomes `/api/v1/compositions`; the backend serves that path verbatim (dual-mounted), so we must forward WITHOUT stripping. The bypassed routes are fetched at `/v2/...`, `/v1/...`, `/check-domain` and also need verbatim forwarding to the backend.

- [ ] **Step 1: Set the base in both env files**

`.env.development` — change the last line:

```
VITE_API_BASE_URL=/api/v1
```

`.env.production` — change the last line (was empty):

```
VITE_API_BASE_URL=/api/v1
```

- [ ] **Step 2: Rework the Vite dev proxy**

In `vite.config.ts`, add the `ProxyOptions` type import and replace the `server.proxy` block. Define one shared backend proxy target (same tenant host header as before) and route the API namespace plus the self-versioned roots to it verbatim:

```ts
import { defineConfig } from 'vite';
import type { ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readFileSync } from 'fs';
```

Add, above `export default defineConfig({`:

```ts
// Forward to the local backend verbatim (no path rewriting) with the tenant
// host header the backend uses to resolve andrewslai.com locally. Shared by
// the /api/v1 namespace and the self-versioned root routes.
const backendProxy: ProxyOptions = {
  target: 'http://localhost:5000',
  changeOrigin: true,
  configure: (proxy) => {
    proxy.on('proxyReq', (proxyReq) => {
      proxyReq.setHeader('host', 'andrewslai.com.localhost');
    });
  },
};
```

Replace the `server` block with:

```ts
  server: {
    proxy: {
      // Versioned API namespace — backend serves /api/v1/* verbatim
      // (dual-mounted during the migration).
      '/api/v1': backendProxy,
      // Self-versioned backend routes that bypass the /api/v1 base.
      '/v2': backendProxy,
      '/v1': backendProxy,
      '/check-domain': backendProxy,
    },
  },
```

(The old `'/api'` stripping entry is removed entirely. `/api/v1/...` starts with `/api/v1`, not `/v1`, so there is no context collision between the two keys.)

- [ ] **Step 3: Typecheck the config change**

Run: `npm run typecheck`
Expected: no errors (`ProxyOptions` resolves the previously-inferred `proxy` param type).

- [ ] **Step 4: Build to confirm the config is valid**

Run: `npm run build`
Expected: build succeeds. (`vite build` loads and validates `vite.config.ts`.)

- [ ] **Step 5: Manual dev smoke (optional, needs the backend on :5000)**

With `task run` serving the backend on port 5000 in the other repo, run `npm run dev` and confirm in the browser network tab:
- a resource fetch (e.g. recipes) goes to `/api/v1/recipes` and returns JSON
- a photos fetch goes to `/v2/photos` and returns JSON
Skip if no backend is running — Steps 3–4 already gate the config, and Task 4 gates behavior.

- [ ] **Step 6: Commit**

```bash
git add .env.development .env.production vite.config.ts
git commit -m "feat(api): repoint the client base to /api/v1

- VITE_API_BASE_URL=/api/v1 in both env files
- dev proxy forwards /api/v1 and the self-versioned roots
  (/v2, /v1, /check-domain) verbatim instead of stripping /api
- safe during the backend dual-mount window: root paths still resolve"
```

---

### Task 4: Full-suite gate

**Files:** none (verification only).

- [ ] **Step 1: Run the complete unit suite**

Run: `npm test`
Expected: PASS — all suites green, including the four bypass tests from Task 1 and the unchanged endpoint suites.

- [ ] **Step 2: Run lint + typecheck (the `ci` gate)**

Run: `npm run ci`
Expected: `typecheck`, `lint`, and `test` all pass.

- [ ] **Step 3: Run the Playwright e2e nav check**

Run: `npm run test:e2e -- e2e/nav.spec.ts`
Expected: PASS. (`nav.spec.ts` exercises routing/structure without backend data; the `library.spec.ts` loop is `describe.skip` pending an Auth0 harness and is unaffected. e2e route stubs elsewhere use `**/path` globs that still match `/api/v1/path`.)

- [ ] **Step 4: No commit** — this task only verifies.

---

## Post-plan handoff

**Status:** Implemented and merged to `main` 2026-07-21 (ff-merge, commit `cb67603`). CI green 758/758, e2e nav 1/1.

**Deploy prerequisite (do NOT skip):** `VITE_API_BASE_URL=/api/v1` lives only in the gitignored on-disk `.env.development` / `.env.production` — those files hold real secrets and are deliberately untracked (the tracked `.env.production.example` now documents the expected `/api/v1` value). The production deploy environment's `.env.production` **must** carry `VITE_API_BASE_URL=/api/v1`; otherwise the built bundle uses the empty base and keeps hitting root paths (still works during the dual-mount window, but the repoint has no effect). Confirm the deploy env before/at rollout.

This build is safe to merge and deploy on its own (dual-mount window). **After it is deployed and live**, the backend can retire its root resource mounts — that is a separate, hard-gated plan in the `kaleidoscope` repo (`plans/2026-07-21-root-mount-retirement/PLAN.md`). Do not start that plan until this one has shipped AND the new build is live (verify the deploy env base above is actually `/api/v1` first — retiring the root mount while a stale empty-base build is live would break it).
