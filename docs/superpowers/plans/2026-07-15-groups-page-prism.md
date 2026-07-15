# GroupsPage → Prism (P3 slice) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the `/groups` audience-management page to the Prism voice — a `PrismThemeProvider`-wrapped dark canvas, mono `AUDIENCES / Groups` eyebrow, the create-group panel on `SurfaceCard`, and the `GroupItem` accordion + member list as hairline mono rows.

**Architecture:** One admin page re-skinned in place. Mount `PrismThemeProvider` around the content below the light `NavBar` (fill-height flex). Reuse `SurfaceCard`; keep the MUI `Accordion` (restyled) so expand/collapse behavior is preserved. Presentation-only — all query/mutation logic and every asserted contract (labels, testids, aria names, count text) unchanged, so both existing test files keep passing without edits.

**Tech Stack:** React 18 + TS + Vite, MUI 6 + Emotion, TanStack Query, MSW, Vitest + Testing Library (jsdom), Storybook 8.

## Global Constraints

- Node 22; `npm run ci` green before push; commit after each task.
- **No raw color literals** (lint `no-restricted-syntax`; exempt: `src/theme/**`, tests, stories). Use `theme.palette.*` / `theme.tokens.*` / `alpha(...)`.
- **Token-driven Prism voice:** mono via `theme.tokens?.typography.mono ?? 'monospace'`; tints via `alpha(theme.palette.<tone>.main, …)`; hairline via `divider`. No new `prism/*` primitive; `GroupItem`/`ConfirmDialog` stay page-local.
- **`PrismThemeProvider` wraps only content below `NavBar`.** Fill-height: outer `Box` `minHeight:'100vh'; display:'flex'; flexDirection:'column'`; content `Box` `flex:1; bgcolor:'background.default'`.
- **Preserve every contract (both test files stay green, UNCHANGED):** heading text `Groups`; group `display_name`s render as summary text and clicking the summary expands; create `TextField` `label="New group name"`; add button `data-testid="add-group-button"` + disabled when empty; count chip text `` `${n} ${n===1?'group':'groups'}` ``; delete-group control accessible name `/delete group/i`; `ConfirmDialog` confirm button name `Delete`; add-member `TextField` `label="Email"`; add-member `IconButton` `aria-label="Add member"`.
- **Presentation only.** No changes to getGroups/addGroup/deleteGroup/add/deleteMember, state, or the confirm→mutate flows. The page's own `Snackbar`/`Alert` stays OUTSIDE the Prism wrap (untouched — separate P3 row).

---

### Task 1: GroupsPage shell → Prism (mount, eyebrow, create panel, count/search)

Re-skin the page chrome; leave `GroupItem` for Task 2.

**Files:**
- Modify: `src/pages/GroupsPage.tsx` (the `GroupsPage` component's `return` + imports; `GroupItem`/`ConfirmDialog` untouched this task)
- Tests: `src/pages/GroupsPage.test.tsx`, `src/pages/GroupsPage.extra.test.tsx` — NOT modified; must keep passing.

**Interfaces:**
- Consumes: `SurfaceCard` from `@/components/common/SurfaceCard`; `PrismThemeProvider` from `@/components/prism`.
- Produces: the re-skinned page shell; `GroupItem` (unchanged) still rendered in the list.

- [ ] **Step 1: Add imports**

Add to the import block at the top of `src/pages/GroupsPage.tsx`:

```tsx
import { useTheme } from '@mui/material/styles';
import { SurfaceCard } from '../components/common/SurfaceCard';
import { PrismThemeProvider } from '../components/prism';
```

- [ ] **Step 2: Add a mono eyebrow helper**

Just above the `GroupsPage` component (after `GroupItem`), add:

```tsx
// ── Page header ──────────────────────────────────────────────────────────────

const GroupsHeader: React.FC = () => (
  <Box sx={{ mb: 3 }}>
    <Box
      component="p"
      sx={(t) => ({
        m: 0,
        fontFamily: t.tokens?.typography.mono ?? 'monospace',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'primary.main',
      })}
    >
      AUDIENCES
    </Box>
    <Typography
      component="h1"
      sx={(t) => ({
        m: 0,
        mt: 0.5,
        fontFamily: t.tokens?.typography.mono ?? 'monospace',
        fontWeight: 700,
        fontSize: '1.6rem',
        letterSpacing: '-0.01em',
      })}
    >
      Groups
    </Typography>
  </Box>
);
```

- [ ] **Step 3: Rewrite the `GroupsPage` `return` (shell only — `GroupItem` list call unchanged)**

Replace the entire `return ( … );` of `GroupsPage` with:

```tsx
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <PrismThemeProvider>
        <Box sx={{ flex: 1, bgcolor: 'background.default' }}>
          <Box id="primary-content" sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <GroupsHeader />

            {/* Create group */}
            <SurfaceCard sx={{ p: 2, mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={(t) => ({
                  fontFamily: t.tokens?.typography.mono ?? 'monospace',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  mb: 1.5,
                })}
              >
                Create New Group
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <TextField
                  size="small"
                  label="New group name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddGroup();
                  }}
                  sx={{ flex: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddGroup}
                  disabled={!newGroupName || addGroupMutation.isPending}
                  data-testid="add-group-button"
                >
                  Add Group
                </Button>
              </Stack>
            </SurfaceCard>

            {isLoading && <LoadingScreen />}

            {!isLoading && (
              <>
                {/* Count chip + search filter */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Chip
                    label={`${groups.length} ${groups.length === 1 ? 'group' : 'groups'}`}
                    size="small"
                    sx={(t) => ({ fontFamily: t.tokens?.typography.mono ?? 'monospace' })}
                  />
                  {groups.length > 1 && (
                    <TextField
                      size="small"
                      placeholder="Search groups…"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      sx={{ flex: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Stack>

                {/* Empty state */}
                {groups.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                    <GroupsIcon sx={{ fontSize: 56, mb: 1.5, opacity: 0.35 }} />
                    <Typography variant="h6" gutterBottom>
                      No groups yet
                    </Typography>
                    <Typography variant="body2">Create your first group above.</Typography>
                  </Box>
                )}

                {/* No search results */}
                {groups.length > 0 && filteredGroups.length === 0 && (
                  <Typography color="text.secondary">
                    No groups match &ldquo;{searchFilter}&rdquo;
                  </Typography>
                )}

                {/* Group list */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {filteredGroups.map((group: Group) => (
                    <GroupItem
                      key={group.group_id}
                      group={group}
                      token={token}
                      onSuccess={(msg) => setSnackbar({ message: msg, severity: 'success' })}
                      onError={(msg) => setSnackbar({ message: msg, severity: 'error' })}
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </PrismThemeProvider>

      {/* Feedback snackbar — intentionally OUTSIDE the Prism wrap (separate P3 row) */}
      <Snackbar
        open={snackbar !== null}
        autoHideDuration={4000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(null)}
          severity={snackbar?.severity ?? 'info'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar?.message ?? ''}
        </Alert>
      </Snackbar>
    </Box>
  );
```

- [ ] **Step 4: Run both test files (must stay green)**

Run: `npx vitest run src/pages/GroupsPage.test.tsx src/pages/GroupsPage.extra.test.tsx`
Expected: PASS (all tests) — heading `Groups`, `add-group-button`, `1 group` count, group names, add/delete flows all preserved. If any fail, a contract was dropped — fix before continuing.

- [ ] **Step 5: Typecheck + lint**

Run: `npm run typecheck && npx eslint src/pages/GroupsPage.tsx`
Expected: clean (no raw color literals).

- [ ] **Step 6: Commit**

```bash
git add src/pages/GroupsPage.tsx
git commit -m "feat(groups): Prism page shell — mono AUDIENCES header + SurfaceCard create panel"
```

---

### Task 2: GroupItem → Prism (accordion + member rows)

Re-skin the accordion shell, member list rows, add-member form, and delete controls. The archetype core.

**Files:**
- Modify: `src/pages/GroupsPage.tsx` (the `GroupItem` component only; `ConfirmDialog` may get mono titles)
- Tests: same two files — NOT modified; must keep passing.

**Interfaces:**
- Consumes: `useTheme`/`alpha` from `@mui/material/styles`; `theme.tokens?.typography.mono`.
- Produces: the re-skinned `GroupItem` (same props, same behavior).

- [ ] **Step 1: Ensure `alpha` is imported**

At the top of `src/pages/GroupsPage.tsx`, extend the styles import added in Task 1:

```tsx
import { useTheme, alpha } from '@mui/material/styles';
```

- [ ] **Step 2: Restyle the `GroupItem` accordion + member rows**

In the `GroupItem` component, add a theme handle at the top of the component body (just after the existing `useState` hooks, before the mutations or anywhere before `return`):

```tsx
  const theme = useTheme();
  const mono = theme.tokens?.typography.mono ?? 'monospace';
```

Then replace the `return ( … )`'s `<Accordion> … </Accordion>` block (NOT the `ConfirmDialog`s that follow it) with:

```tsx
      <Accordion
        disableGutters
        elevation={0}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: (t) => `${t.shape.borderRadius}px`,
          bgcolor: 'background.paper',
          '&:before': { display: 'none' },
          overflow: 'hidden',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ flexGrow: 1, fontFamily: mono, fontWeight: 600, letterSpacing: '0.02em' }}>
            {group.display_name}
          </Typography>
          <Chip
            label={memberCount === 1 ? '1 member' : `${memberCount} members`}
            size="small"
            sx={{ mr: 1, alignSelf: 'center', fontFamily: mono }}
          />
        </AccordionSummary>
        <AccordionDetails>
          {/* Member list */}
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontFamily: mono, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'text.secondary' }}
          >
            Members
          </Typography>
          {memberCount === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              No members yet — add one below.
            </Typography>
          ) : (
            <List dense disablePadding>
              {(group.memberships ?? []).map((m: Membership) => (
                <ListItem
                  key={m.membership_id}
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    '&:last-of-type': { borderBottom: 0 },
                  }}
                  secondaryAction={
                    <Tooltip title="Remove member">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setConfirmDeleteMemberId(m.membership_id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    primary={m.alias ?? m.email}
                    secondary={m.alias ? m.email : undefined}
                    secondaryTypographyProps={{ sx: { fontFamily: mono, fontSize: '0.72rem' } }}
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Divider sx={{ my: 1.5 }} />

          {/* Add member form */}
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontFamily: mono, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'text.secondary' }}
          >
            Add Member
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ sm: 'flex-start' }}
          >
            <TextField
              size="small"
              label="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddMember();
              }}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              label="Alias (optional)"
              value={newAlias}
              onChange={(e) => setNewAlias(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddMember();
              }}
              sx={{ flex: 1 }}
            />
            <Tooltip title="Add member">
              <IconButton
                color="primary"
                onClick={handleAddMember}
                disabled={!newEmail || addMemberMutation.isPending}
                aria-label="Add member"
                sx={{
                  border: 1,
                  borderColor: (t) => alpha(t.palette.primary.main, 0.4),
                  borderRadius: 1,
                }}
              >
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          {/* Delete group — placed in details to prevent accidental clicks */}
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => setConfirmDeleteGroup(true)}
            aria-label="Delete group"
          >
            Delete Group
          </Button>
        </AccordionDetails>
      </Accordion>
```

- [ ] **Step 3: Run both test files (must stay green)**

Run: `npx vitest run src/pages/GroupsPage.test.tsx src/pages/GroupsPage.extra.test.tsx`
Expected: PASS — accordion still expands on summary click; `Email` label, `Add member` aria, `Delete group` aria, `Delete` confirm all intact; add-member/delete flows fire. If any fail, fix before continuing.

- [ ] **Step 4: Typecheck + lint**

Run: `npm run typecheck && npx eslint src/pages/GroupsPage.tsx`
Expected: clean. (Confirm `useTheme`/`alpha` are both used — no unused-import lint error.)

- [ ] **Step 5: Commit**

```bash
git add src/pages/GroupsPage.tsx
git commit -m "feat(groups): Prism accordion + hairline mono member rows"
```

---

### Task 3: Verification + render-smoke story

**Files:**
- Create: `src/pages/GroupsPage.stories.tsx`

**Interfaces:**
- Consumes: `GroupsPage` (default export); `QueryClient`/`QueryClientProvider`; `AuthContext` from `@/auth/AuthProvider`; `PrismThemeProvider`; `MemoryRouter`.

- [ ] **Step 1: Add `GroupsPage.stories.tsx`**

Note: mirror the auth-bridging decorator from `src/pages/ManagerPage.stories.tsx` (which wraps in the real `AuthContext.Provider` because `GroupsPage` calls `useAuth()` directly). If `ManagerPage.stories.tsx`'s import path or mock shape differs from below, prefer what that file actually does.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GroupsPage from './GroupsPage';
import { AuthContext } from '../auth/AuthProvider';
import type { AuthContextValue } from '../auth/AuthProvider';
import { PrismThemeProvider } from '../components/prism';
import type { Group } from '../types/group';

// Render-smoke + visual QA for the GroupsPage Prism re-skin (P3 slice). The page
// runs a `['groups']` query and reads `useAuth()` directly, so this seeds a fresh
// QueryClient's cache with groups that HAVE members (so the accordion member rows
// render) and bridges auth via the real AuthContext.Provider with a mock value.

const groups: Group[] = [
  {
    group_id: 'g1',
    display_name: 'Family',
    memberships: [
      { membership_id: 'm1', membership_created_at: '2026-01-01T00:00:00Z', alias: 'Mom', email: 'mom@example.com' },
      { membership_id: 'm2', membership_created_at: '2026-01-02T00:00:00Z', alias: null, email: 'dad@example.com' },
    ],
  },
  { group_id: 'g2', display_name: 'Close Friends', memberships: [] },
];

const authValue: AuthContextValue = {
  isAuthenticated: true,
  isLoading: false,
  token: 'story-token',
  userProfile: { firstName: 'Admin', realm_access: { roles: ['localhost:admin'] } },
  login: () => {},
  logout: () => {},
};

const makeClient = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  client.setQueryData(['groups'], groups);
  return client;
};

const meta: Meta<typeof GroupsPage> = {
  title: 'Pages/GroupsPage',
  component: GroupsPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthContext.Provider value={authValue}>
          <QueryClientProvider client={makeClient()}>
            <PrismThemeProvider>
              <Story />
            </PrismThemeProvider>
          </QueryClientProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof GroupsPage>;

export const Default: Story = {};
```

This mirrors `ManagerPage.stories.tsx` exactly (typed `AuthContextValue`, no cast). Verify by building Storybook.

- [ ] **Step 2: Build Storybook**

Run: `npm run build-storybook`
Expected: completes without error.

- [ ] **Step 3: Full CI gate**

Run: `npm run ci`
Expected: typecheck + lint + all tests PASS. Record the final test count.

- [ ] **Step 4: Commit**

```bash
git add src/pages/GroupsPage.stories.tsx
git commit -m "test(groups): Prism render-smoke story (seeded groups + members)"
```

---

## Self-Review

- **Spec coverage:** mount + mono eyebrow + create-panel SurfaceCard + count/search (Task 1) ✓; accordion + hairline member rows + add-member form + delete controls (Task 2) ✓; render-smoke story + CI (Task 3) ✓. Contract preservation asserted by the retained, unedited test files (Tasks 1–2) ✓. Snackbar left outside the wrap (Task 1 Step 3 comment) ✓.
- **Placeholder scan:** no TBD/TODO; every code step is complete; commands have expected outputs. Task 3's story notes a concrete fallback (mirror `ManagerPage.stories.tsx`).
- **Type consistency:** `GroupItem` props unchanged; `Membership`/`Group` fields used (`membership_id`, `alias`, `email`, `memberships`) match `src/types/group.ts`; `SurfaceCard` accepts `sx` + children (`BoxProps`); the story's `authValue` shape mirrors `AuthContextValue` (as used by the ManagerPage story). `useTheme`/`alpha` both used in `GroupItem` (no unused-import).
