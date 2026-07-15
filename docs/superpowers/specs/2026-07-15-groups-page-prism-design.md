# GroupsPage (Audience / Member Rows) → Prism (P3 slice) — Design

**Status:** Approved design (2026-07-15). Next: implementation plan via writing-plans.

**Goal:** Bring the `/groups` audience-management page — the "Audience / member rows" archetype from
the audit's P3 row — into the Prism voice: a `PrismThemeProvider`-wrapped dark canvas, a mono
`AUDIENCES / Groups` eyebrow, the "Create New Group" panel on `SurfaceCard`, and the `GroupItem`
accordion + member list rebuilt as hairline, mono, mission-control rows.

**Context:** First P3 slice, chosen as the **admin-adjacent** (safe) half of P3 — `/groups` is an
admin surface (the Manager hub's "Audiences" capability links to it), so it takes the same
mount-and-re-skin treatment as the P2 admin slices. The **public-reader** P3 items (HomePage,
ArticlePage, portfolio, career timeline, skill chips) are explicitly NOT in scope — those are a
separate brand decision. See the `prism-p2-image-manager` memory + the Prism-adoption audit.

---

## Global Constraints

- Node 22; `npm run ci` (typecheck + lint + test) green before push; commit after each task.
- **No raw color literals** (lint `no-restricted-syntax`; exempt: `src/theme/**`, tests, stories).
  Use `theme.palette.*` / `theme.tokens.*` / `alpha(...)`.
- **Token-driven Prism voice:** mono via `theme.tokens?.typography.mono ?? 'monospace'`; tinted fills
  via `alpha(theme.palette.<tone>.main, …)`; hairline borders via `divider`. No new `prism/*`
  primitive — reuse `SurfaceCard` (and `theme.*`). `GroupItem`/`ConfirmDialog` stay page-local.
- **`PrismThemeProvider` wraps only the content below `NavBar`.** Fill-height pattern: outer page
  `Box` = `minHeight:'100vh'; display:'flex'; flexDirection:'column'`; wrapped content `Box` =
  `flex:1; bgcolor:'background.default'`.
- **Preserve ALL existing contracts** (covered by `GroupsPage.test.tsx` + `GroupsPage.extra.test.tsx`,
  which must keep passing UNCHANGED — this slice edits no test):
  - Heading text `Groups`.
  - Group `display_name`s render as text in the accordion summary (`Family`, `Friends`), and clicking
    the summary text expands the accordion.
  - Create-group `TextField` keeps `label="New group name"`; the add button keeps
    `data-testid="add-group-button"` and stays disabled when the name is empty.
  - Count chip text stays `` `${n} ${n === 1 ? 'group' : 'groups'}` `` (e.g. `1 group`).
  - Delete-group control keeps an accessible name matching `/delete group/i`; the `ConfirmDialog`
    confirm button keeps the accessible name `Delete` (`/^delete$/i`).
  - Add-member `TextField` keeps `label="Email"`; the add-member `IconButton` keeps
    `aria-label="Add member"`.
- **Presentation only.** All query/mutation logic (getGroups, addGroup, deleteGroup, add/deleteMember),
  state, and the confirm-then-mutate flows are unchanged. API access stays through `src/api/groups`.

---

## Architecture / Approach

One admin page, re-skinned in place. No shared component changes; `SurfaceCard` is the only common
primitive pulled in.

### 1. Page shell (`GroupsPage`)

- **Mount + header:** wrap the content below `NavBar` in `PrismThemeProvider`, fill-height canvas
  (`maxWidth` container preserved), mono eyebrow `AUDIENCES` (accent) + `Typography component="h1"`
  mono `Groups` (text stays exactly `Groups`) — the eyebrow/heading idiom from the prior admin slices.
- **Create New Group panel:** `Paper variant="outlined"` → `SurfaceCard`; the "Create New Group"
  caption → mono uppercase; keep the `New group name` `TextField` + the `Add Group` button
  (`data-testid` intact). The button may stay MUI `Button variant="contained"` (themes dark under
  Prism) — no behavior change.
- **Count chip + search:** keep the count `Chip` (text format unchanged) with a mono label; keep the
  search `TextField` (themes dark). Empty / no-result states get mono voice; the `GroupsIcon` empty
  state keeps its structure.

### 2. `GroupItem` (the accordion + member rows — the archetype's core)

- **Accordion shell:** keep the MUI `Accordion` (preserves expand/collapse + the clickable summary
  the tests rely on), restyled to a Prism panel — `elevation={0}`/`disableGutters`, hairline `divider`
  border, `background.paper`, no default shadow/expand-gutter. Summary: `display_name` in the mono
  heading voice; the member-count `Chip` → mono (text unchanged).
- **Member list:** the `List`/`ListItem` rows → hairline rows (a `divider` bottom rule, mono
  `email`/`alias` meta, the primary alias-or-email in `text.primary`), matching the audit's
  hairline-row "audience/member" specimen. Keep the per-row remove `IconButton` (Tooltip "Remove
  member", `color="error"`). The empty "No members yet" line gets mono voice.
- **Add-member form:** keep both `TextField`s (`label="Email"`, `label="Alias (optional)"`) and the
  add `IconButton` (`aria-label="Add member"`); mono the "Add Member" / "Members" section captions.
- **Delete-group button + `ConfirmDialog`s:** keep the `Delete Group` button (accessible name matches
  `/delete group/i`) and both confirm dialogs (MUI `Dialog` themes dark via Prism context through its
  portal; the confirm button keeps the name `Delete`). Optionally mono the dialog titles — no
  structural change.

---

## Reuse Safety & Testing

Co-located Vitest + Testing Library (jsdom), MSW-mocked (the existing tests already use
`QueryClientProvider` + MSW + a plain `ThemeProvider`). No public reader or alternate theme context is
involved — `GroupsPage`/`GroupItem`/`ConfirmDialog` are page-local, so there is **no cross-theme reuse
invariant** to hold, and the only shared primitive touched (`SurfaceCard`) is unchanged and
token-driven.

- **Both existing test files keep passing UNCHANGED.** Because the re-skin preserves every contract
  (heading, names, labels, testid, aria names, count text, accordion expand), no test edits are
  needed — the retained green suite is the proof the re-skin didn't regress behavior. The tests wrap
  the page in a token-less `createTheme()`, so the `theme.tokens?.*` fallback paths are exercised.
- **Lint/type:** the mono/tint usages go through `theme.tokens?.*`/`alpha(...)` — confirm `npm run
  lint` + `npm run typecheck` clean.
- **Story (render smoke):** a `GroupsPage.stories.tsx` seeding the `['groups']` query cache with
  groups that HAVE `memberships` (so the member rows render), wrapped in
  `MemoryRouter` + `AuthContext.Provider` (mock, matching the `ManagerPage` story) +
  `QueryClientProvider` + `PrismThemeProvider` — a dark render smoke for the accordion + member rows.

---

## Out of Scope

- The page's own MUI `Snackbar` + `Alert` feedback toast — it is a sibling OUTSIDE the
  `PrismThemeProvider` wrap and stays light; the Snackbar/notification re-skin is its own separate P3
  row (deferred). Leave it untouched.
- The public-reader P3 items (HomePage / ArticlePage / PortfolioSection / BioSection / career timeline
  / skill chips) — a separate brand decision, not this slice.
- Any new `prism/*` primitive, or extracting a shared "member row"/"audience card" component (single
  consumer — YAGNI).
- Query/mutation/orchestration logic changes — presentation only.
- Cross-cutting Prism a11y hardening — tracked as one separate pass.

---

## Decisions Resolved (during brainstorming)
1. **Slice choice:** GroupsPage (admin-adjacent P3), not the public-reader rebrand. *(user)*
2. **Mount:** `/groups` is admin → mount `PrismThemeProvider` (like the P2 admin slices). *(design)*
3. **Keep the MUI `Accordion`** (restyled) rather than rebuilding on `EntityCard`, to preserve the
   expand/collapse behavior and the summary-click the tests exercise. *(design)*
4. **No test changes:** the re-skin preserves every asserted contract, so both test files stay green
   unchanged — that's the regression proof. *(design)*
5. **Snackbar stays light / out of scope** — it's the separate Snackbar P3 row. *(design — tight scope)*
6. **`SurfaceCard` for the create panel**, page-local components otherwise, no new primitive. *(design)*
