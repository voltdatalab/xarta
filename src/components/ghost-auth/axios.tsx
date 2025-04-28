import axios from "axios";
import { ghostMembersAuthInterceptor } from "./ghostMembersAuthInterceptor";
import jwkToPem from "jwk-to-pem";
import { tokenPersistenceChoice } from "./constants";
import { ghostStaffAuthInterceptor } from "./ghostStaffAuthInterceptor";
import { ConfigPublicRootUrl } from "../ghost-api/admin/fetchPost";
import { XartaConfig } from "@/config/XartaConfig";

export type ConfigGhostAuth = Pick<XartaConfig, "JWT_TOKEN_KEY" | "LOGIN_URL" | "TOKEN_ENDPOINT" | "WELL_KNOWN_ENDPOINT">;

// TODO: Needs adjustment
export const axiosXarta = ({ config }: { config: ConfigPublicRootUrl & ConfigGhostAuth }) => {
    const inst = axios.create({
        baseURL: config.PUBLIC_ROOT_URL
    });

    const enableMembersInterceptor = false;
    const enableStaffInterceptor = true;

    if (enableMembersInterceptor) {

        inst.interceptors.request.use(ghostMembersAuthInterceptor({
            // Fetch publicKey
            publicKeyFn: () => fetch(config.WELL_KNOWN_ENDPOINT).then(j => j.json()).then((value) => {
                const publicKey = value.keys[0] as jwkToPem.JWK;

                return publicKey;
            }),
            tokenEndpoint: config.TOKEN_ENDPOINT,
            loginURL: config.LOGIN_URL,
            persistenceChoice: tokenPersistenceChoice,
            storageKey: config.JWT_TOKEN_KEY,
        }));
    }

    if (enableStaffInterceptor) {
        inst.interceptors.request.use(ghostStaffAuthInterceptor({config}));
    }

}