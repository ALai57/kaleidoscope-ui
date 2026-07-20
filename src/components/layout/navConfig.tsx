import React from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupsIcon from '@mui/icons-material/Groups';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import RuleIcon from '@mui/icons-material/Rule';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaletteIcon from '@mui/icons-material/Palette';
import type { NavBarUser } from './navTypes';
import { isSiteAdmin, isWriter } from '@/auth/authHelpers';

export type StudioGroup = 'content' | 'build' | 'system';

export interface StudioNavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  group: StudioGroup;
  /** Minimum role that may see this item. `isWriter` is true for admins too. */
  minRole: 'writer' | 'admin';
}

/**
 * The single source of Studio (admin) nav sections — consumed by the desktop
 * rail (SideRail) and the mobile drawer (MobileNav). Order + groups drive the
 * hairline dividers between groups; `minRole` drives per-role visibility.
 */
export const STUDIO_NAV_ITEMS: StudioNavItem[] = [
  { label: 'Manager', to: '/manager', icon: <SpaceDashboardIcon fontSize="small" />, group: 'content', minRole: 'writer' },
  { label: 'Articles', to: '/articles', icon: <ArticleIcon fontSize="small" />, group: 'content', minRole: 'writer' },
  { label: 'Images', to: '/images', icon: <PhotoLibraryIcon fontSize="small" />, group: 'content', minRole: 'writer' },
  { label: 'Experience', to: '/experience', icon: <BadgeIcon fontSize="small" />, group: 'content', minRole: 'writer' },
  { label: 'Projects', to: '/projects', icon: <WorkspacesIcon fontSize="small" />, group: 'build', minRole: 'admin' },
  { label: 'Workflows', to: '/workflows', icon: <AccountTreeIcon fontSize="small" />, group: 'build', minRole: 'admin' },
  { label: 'Agents', to: '/agents', icon: <GroupsIcon fontSize="small" />, group: 'build', minRole: 'admin' },
  { label: 'Workspace Roots', to: '/workspace-roots', icon: <FolderOpenIcon fontSize="small" />, group: 'build', minRole: 'admin' },
  { label: 'Score Definitions', to: '/score-definitions', icon: <RuleIcon fontSize="small" />, group: 'build', minRole: 'admin' },
  { label: 'Groups', to: '/groups', icon: <ManageAccountsIcon fontSize="small" />, group: 'system', minRole: 'admin' },
  { label: 'UI Manager', to: '/ui', icon: <PaletteIcon fontSize="small" />, group: 'system', minRole: 'admin' },
];

/** Studio items visible to `user`; `[]` when the user is neither writer nor admin. */
export function visibleStudioItems(user?: NavBarUser): StudioNavItem[] {
  const writer = isWriter(user);
  const admin = isSiteAdmin(user);
  if (!writer && !admin) return [];
  return STUDIO_NAV_ITEMS.filter((item) => (item.minRole === 'writer' ? writer : admin));
}
