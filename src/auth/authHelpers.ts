
export const getAdminHost = () => {
    let hostname: string;
    if ((typeof window) === 'undefined') {
        return 'localhost';
    } else if (window.location.host.split('.').slice(-2).join('.') === 'fly.dev'){
        return 'ephemeral';
    } else {
        return window.location.hostname;
    }
}