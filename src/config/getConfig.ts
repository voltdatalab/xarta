import { unstable_noStore as noStore } from 'next/cache';

export const getXartaConfig = async () => {

    // https://nextjs.org/docs/app/api-reference/functions/unstable_noStore
    noStore();

    // Attempt to use dynamic
    const PUBLIC_ROOT_URL = process.env.PUBLIC_ROOT_URL ?? process.env.STORYBOOK_ROOT_URL;
    const PUBLIC_DEMO_USERNAME = process.env.PUBLIC_DEMO_USERNAME;
    const PUBLIC_DEMO_PASSWORD = process.env.PUBLIC_DEMO_PASSWORD;

    console.log('PUBLIC_ROOT_URL:', PUBLIC_ROOT_URL);
    
    const PUBLIC_GHOST_ADMIN_API_URL = `${PUBLIC_ROOT_URL}/ghost/api/admin/`;
    
    const PUBLIC_NEXT_XARTA_API_WITH_GHOST_BASE = `${PUBLIC_ROOT_URL}/ghost/xarta/api`;
    
    const PUBLIC_GHOST_TAGS_PANEL_URL = `${PUBLIC_ROOT_URL}/ghost/#/tags`;
    
    const PUBLIC_NEXT_API_BASE_URL = `${PUBLIC_ROOT_URL}/xarta/api`;
    
    const XARTA_DOMAIN = `${PUBLIC_ROOT_URL}/`;
    
    // frontend only
    const NEXT_XARTA_BASE_URL = `${PUBLIC_ROOT_URL}/xarta`;
    
    const AUTH_API_ROOT = PUBLIC_ROOT_URL;

    return {
        PUBLIC_ROOT_URL: PUBLIC_ROOT_URL,
        PUBLIC_DEMO_USERNAME: PUBLIC_DEMO_USERNAME,
        PUBLIC_DEMO_PASSWORD: PUBLIC_DEMO_PASSWORD,
        PUBLIC_GHOST_ADMIN_API_URL,
        PUBLIC_NEXT_XARTA_API_WITH_GHOST_BASE,
        PUBLIC_GHOST_TAGS_PANEL_URL,
        PUBLIC_NEXT_API_BASE_URL,
        XARTA_DOMAIN,
        NEXT_XARTA_BASE_URL,
        ghostApiTagsUrl: `${PUBLIC_ROOT_URL}/ghost/api/admin/tags/?limit=all`,
        // Related to ghost auth
        AUTH_API_ROOT,
        TOKEN_ENDPOINT: `${AUTH_API_ROOT}/members/api/session/`,
        WELL_KNOWN_ENDPOINT: `${AUTH_API_ROOT}/members/.well-known/jwks.json`,
        JWT_TOKEN_KEY: `xartaJwtToken`,
        LOGIN_URL: `${AUTH_API_ROOT}/#/portal/signin`
    }
}