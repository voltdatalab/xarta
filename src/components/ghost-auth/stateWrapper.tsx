import jwkToPem from "jwk-to-pem";

// Note: This should always be imported a singleton
export const stateWrapper = {
    token: null as (string | null),
    isLoading: false,
    queue: [] as ((token: string) => void)[],
    config: {
        publicKey: null as (null | jwkToPem.JWK),
        publicKeyFn: null as (null | (() => Promise<null | jwkToPem.JWK>)),
        tokenEndpoint: null as (null | string),
        loginURL: null as (null | string),
        storageKey: null as (null | string),
        persistenceChoice: null as (Storage | null)
    }
};
