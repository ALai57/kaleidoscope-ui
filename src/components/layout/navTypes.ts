/**
 * Shared user shape for the app's navigation shells (SideRail, AdminNavRail,
 * AdminLayout). Extracted from the legacy NavBar so that component can be
 * deleted while consumers keep a stable import.
 */
export interface NavBarUser {
  firstName?: string | undefined;
  lastName?: string | undefined;
  realm_access?: { roles: string[] } | undefined;
}
