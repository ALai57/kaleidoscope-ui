# `npm run ephemeral:deploy` — frontend-owned ephemeral deploy

**Date:** 2026-07-18
**Status:** Approved design

## Problem

Deploying this SPA to an ephemeral Fly.io test environment is currently owned by
the **backend**: `../kaleidoscope/scripts/ephemeral/build-frontend` reaches across
the repo boundary into `FRONTEND_DIR` to run `npm ci && npm run build -- --mode
ephemeral`, hard-codes the Vite dist path, and syncs it to S3. The backend knows
too much about how the frontend is built — the dependency points the wrong way.

We want a `npm run ephemeral:deploy` in **this** repo that:

- builds the SPA for an ephemeral env and syncs it to that env's S3 prefix;
- auto-detects the deployed ephemeral environments via `fly` when no name is
  given, and lets the operator pick one (the same way the backend's
  `resolve_slug_or_select` does);
- is fully self-contained — no dependency on the backend's `lib.sh`, so the
  backend can become a *consumer* of this script instead of its author.

## The naming contract (shared, not shared code)

An ephemeral env is identified by a short **slug**. Every resource name derives
from it. This is a contract between the two repos, documented in both — not
shared code (the repos stay independent):

| Resource   | Name                             |
|------------|----------------------------------|
| Fly app    | `kal-eph-<slug>`                 |
| S3 bucket  | `kal-ephemeral`                  |
| S3 prefix  | `eph-<slug>/`                    |

The backend's `deploy-app` sets `KALEIDOSCOPE_CLIENT_PREFIX=eph-<slug>/`, so the
SPA **must** land at `s3://kal-ephemeral/eph-<slug>/` or `/` 404s. Slug
derivation must therefore be deterministic and idempotent across both repos.

## Design

### New files (this repo)

```
scripts/deployment/ephemeral-lib.sh        # pure, sourceable helpers
scripts/deployment/deploy-ephemeral        # the executable (npm entry point)
scripts/deployment/ephemeral-lib.test.sh   # bash unit tests for the pure helpers
```

`package.json`:

```json
"ephemeral:deploy": "./scripts/deployment/deploy-ephemeral"
```

### `ephemeral-lib.sh` — pure helpers (unit-tested, no network)

Mirrors the backend's contract-relevant helpers so the two agree on slug/prefix:

- `log` / `warn` / `die` / `require_cmd` — logging + preconditions.
- `derive_slug <raw>` — lowercase, non-alnum collapsed to `-`, trim, cap at 30
  chars (trailing dash trimmed after the cut, warn on truncation). Idempotent.
- `parse_ephemeral_slugs` — stdin `fly apps list --json` → one slug per line
  (`.[].Name | select(startswith("kal-eph-")) | ltrimstr("kal-eph-")`). Pure, so
  it's testable against a JSON fixture with no `fly`/network.
- `s3_prefix <slug>` → `eph-<slug>/`.
- `list_ephemeral_slugs` — `fly apps list --json | parse_ephemeral_slugs`.
- `select_ephemeral_slug` — interactive picker over the deployed `kal-eph-*`
  apps. Prints **only** the chosen slug to stdout (prompts/menu → stderr).
  Auto-selects when exactly one exists; dies with an actionable message when
  there are none or when stdin is not a TTY.
- `resolve_slug_or_select "$@"` — `--name=<slug>` wins (normalized via
  `derive_slug`); otherwise `select_ephemeral_slug`. **No git-branch fallback** —
  a deploy targets a real cloud env on purpose, not whatever branch is checked
  out.

### `deploy-ephemeral` — the executable

```bash
#!/usr/bin/env bash
set -euo pipefail
source ".../ephemeral-lib.sh"

SLUG="$(resolve_slug_or_select "$@")"      # --name=<slug> or interactive pick
PREFIX="$(s3_prefix "$SLUG")"

require_cmd npm; require_cmd aws

log "Building SPA (npm run build -- --mode ephemeral) for '$SLUG'..."
npm run build -- --mode ephemeral

DIST="resources/kaleidoscope.client/static/dist"
[ -f "$DIST/index.html" ] || die "No $DIST/index.html — did Vite's outDir change?"

log "Syncing $DIST/ -> s3://kal-ephemeral/$PREFIX ..."
aws s3 sync "$DIST/" "s3://kal-ephemeral/$PREFIX" --delete
log "Deployed to s3://kal-ephemeral/$PREFIX"
```

Usage:

```bash
npm run ephemeral:deploy                 # auto-detect + pick from deployed apps
npm run ephemeral:deploy -- --name=pr-42 # target a specific env, no prompt
```

**Credentials:** ambient AWS credentials only — exactly like the existing
`npm run deploy` / `deploy-kaleidoscope-client`. The operator (or the backend
wrapper, below) must have AWS creds with access to the `kal-ephemeral` bucket. No
dependency on the backend's `.env.fly.staging`.

**Build mode:** `--mode ephemeral` uses the existing `.env.ephemeral`.

### Backend flip (`../kaleidoscope`)

Complete the inversion: rewrite `scripts/ephemeral/build-frontend` into a thin
wrapper that delegates to this script, keeping the backend responsible only for
its own staging secrets and slug orchestration:

```bash
#!/usr/bin/env bash
set -euo pipefail
source ".../lib.sh"
load_staging_env                 # exports AWS_* so the child's aws s3 sync inherits them
: "${AWS_ACCESS_KEY_ID:?...}"; : "${AWS_SECRET_ACCESS_KEY:?...}"
require_cmd npm
[ -d "$FRONTEND_DIR" ] || die "Frontend repo not found at $FRONTEND_DIR"
log "Delegating to frontend 'npm run ephemeral:deploy' in $FRONTEND_DIR ..."
( cd "$FRONTEND_DIR" && npm run ephemeral:deploy -- "$@" )
```

- `up` still calls `build-frontend --name="$SLUG"`; the `--name` is forwarded to
  the frontend script, so the orchestrated flow is unchanged.
- `load_staging_env` exports the staging AWS creds into the environment; the
  frontend's `aws s3 sync` inherits them as "ambient" creds. A human running the
  frontend script directly uses their own profile instead.
- The backend no longer knows `npm ci`, `--mode ephemeral`, or the Vite dist
  path — those move to where they belong.

Note: `npm ci` is dropped from the deploy path. `build-frontend`'s old behavior
ran `npm ci` every time; the frontend script assumes deps are installed (the
backend wrapper can prepend `npm ci` in `FRONTEND_DIR` if a clean install is
required in CI, but that is a CI concern, not a deploy concern).

## Testing

- `ephemeral-lib.test.sh` — bash unit tests mirroring the backend's
  `lib_test.sh`: `derive_slug` normalization/truncation/idempotence, and
  `parse_ephemeral_slugs` against `fly apps list --json` fixtures (including the
  empty-list and the `kal-ephemeral`-must-not-match edge cases). No services
  required. Runnable via `bash scripts/deployment/ephemeral-lib.test.sh`.
- The build + `aws s3 sync` path is not unit-tested (it hits real cloud
  services); it is exercised end-to-end whenever an ephemeral env is deployed.

## Out of scope

- Provisioning/tearing down the Fly app, Neon DB, or tenant assets — those remain
  backend `ephemeral:*` tasks. This script only builds and ships the SPA.
- Any change to the production `npm run deploy` path.
