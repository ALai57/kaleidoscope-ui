
export const ADMIN_ROLE_SUFFIX = ':admin';

export const getAdminHost = () => {
    if ((typeof window) === 'undefined') {
        return 'localhost';
    } else if (window.location.host.split('.').slice(-2).join('.') === 'fly.dev'){
        return 'ephemeral';
    } else {
        return window.location.hostname;
    }
}

/** The site-admin role name for the current host (e.g. `andrewslai.com:admin`). */
export const getAdminRole = (): string => getAdminHost() + ADMIN_ROLE_SUFFIX;

/** Minimal shape needed for authorization checks — both AuthUserProfile and
 *  NavBarUser satisfy this. */
export interface WithRoles {
    realm_access?: { roles: string[] } | undefined;
}

/** True when the user holds the admin role for the current host. Use this for
 *  any site-admin gating rather than re-deriving the role check inline. */
export const isSiteAdmin = (user?: WithRoles | null): boolean => {
    const roles = new Set(user?.realm_access?.roles ?? []);
    return roles.has(getAdminRole());
};
