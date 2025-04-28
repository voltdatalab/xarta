
export const INTERNAL_ROOT_URL = process.env.NEXT_INTERNAL_ROOT_URL;


// Database configuration
export const DB_CONFIG = {
  host: process.env.XARTA_DB_HOST || 'localhost',
  port: parseInt(process.env.XARTA_DB_PORT || '5432'),
  database: process.env.XARTA_DB_NAME || 'xarta',
  user: process.env.XARTA_DB_USER,
  password: process.env.XARTA_DB_PASSWORD
};

// These are all used by the api, so we should be able to use the internal route to caddy
export const config = {
  INTERNAL_GHOST_URL: process.env.INTERNAL_GHOST_URL,
  GHOST_ADMIN_API_KEY: process.env.GHOST_ADMIN_API_KEY,
  GHOST_CONTENT_API_KEY: process.env.GHOST_CONTENT_API_KEY
};
// Configure the Ghost Content API URL and Key
export const INTERNAL_GHOST_POSTS_API_URL = `${config.INTERNAL_GHOST_URL}/ghost/api/admin/posts/`;
export const INTERNAL_GHOST_TAGS_API_URL = `${config.INTERNAL_GHOST_URL}/ghost/api/content/tags/`;

// Used backend only
export const INTERNAL_NEXT_API_BASE_URL = `${INTERNAL_ROOT_URL}/xarta/api`;

// routes and prefixes
export const CONFIGURACOES = `/settings`;
export const EDITAR_PERFIL = `/settings/profile`;
export const HOME = `/`;
export const xartaCardContainerPrefix = `xarta-card-container-`;
