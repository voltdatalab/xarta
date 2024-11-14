import { ROOT_URL } from "@/config/config";

export const AUTH_API_ROOT = ROOT_URL;
export const TOKEN_ENDPOINT = `${AUTH_API_ROOT}/members/api/session/`;
export const WELL_KNOWN_ENDPOINT = `${AUTH_API_ROOT}/members/.well-known/jwks.json`;

export const JWT_TOKEN_KEY = `xartaJwtToken`;
export const LOGIN_URL = `${AUTH_API_ROOT}/#/portal/signin`;

// Choose either sessionStorage or localStorage
export const tokenPersistenceChoice = (typeof window !== "undefined") ? localStorage : {
    setItem: (key: string, value: any) => { return null},
    getItem: (key: string) => { return null}
};