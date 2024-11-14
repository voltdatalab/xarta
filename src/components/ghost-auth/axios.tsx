import axios from "axios";
import { ghostMembersAuthInterceptor } from "./ghostMembersAuthInterceptor";
import jwkToPem from "jwk-to-pem";
import { JWT_TOKEN_KEY, LOGIN_URL, TOKEN_ENDPOINT, tokenPersistenceChoice, WELL_KNOWN_ENDPOINT } from "./constants";
import { ROOT_URL } from "@/config/config";
import { ghostStaffAuthInterceptor } from "./ghostStaffAuthInterceptor";

export const axiosXarta = axios.create({
    baseURL: ROOT_URL
});

const enableMembersInterceptor = false;
const enableStaffInterceptor = true;

if (enableMembersInterceptor) {

    axiosXarta.interceptors.request.use(ghostMembersAuthInterceptor({
        // Fetch publicKey
        publicKeyFn: () => fetch(WELL_KNOWN_ENDPOINT).then(j => j.json()).then((value) => {
            const publicKey = value.keys[0] as jwkToPem.JWK;

            return publicKey;
        }),
        tokenEndpoint: TOKEN_ENDPOINT,
        loginURL: LOGIN_URL,
        persistenceChoice: tokenPersistenceChoice,
        storageKey: JWT_TOKEN_KEY,
    }));
}

if (enableStaffInterceptor) {
    axiosXarta.interceptors.request.use(ghostStaffAuthInterceptor);
}