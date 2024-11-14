import { verifyTokenAndGetExpirationCountdown } from "./verifyTokenAndGetExpirationCountdown";
import { InternalAxiosRequestConfig } from "axios";
import { stateWrapper } from "./stateWrapper";
import { enqueueTokenCallback } from "./enqueueTokenCallback";
import { renewToken } from "./renewToken";

export const ghostMembersAuthInterceptor = (config: any) => {

    if (!(config.publicKeyFn)) {
        throw new Error('Missing config.publicKeyFn');
    }

    if (!(config.tokenEndpoint)) {
        throw new Error(`Missing config.tokenEndpoint`);
    }

    if (!(config.loginURL)) {
        throw new Error(`Missing config.loginURL`);
    }

    if (!(config.storageKey)) {
        throw new Error(`Missing config.storageKey`);
    }

    if (!(config.persistenceChoice)) {
        throw new Error(`Missing config.persistenceChoice`);
    }

    stateWrapper.config.publicKeyFn = config.publicKeyFn;
    stateWrapper.config.publicKey = null;
    stateWrapper.config.tokenEndpoint = config.tokenEndpoint;
    stateWrapper.config.loginURL = config.loginURL;
    stateWrapper.config.storageKey = config.storageKey;
    stateWrapper.config.persistenceChoice = config.persistenceChoice;

    /* Set token by loading previous value, if exists */
    stateWrapper.token = config.persistenceChoice.getItem(config.storageKey);

    return async function (req: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>> {

        if (!(stateWrapper.config.publicKey)) {
            const pk = stateWrapper.config.publicKeyFn?.();
            stateWrapper.config.publicKey = await pk ?? null;
        }

        try {

            if (!(stateWrapper.token)) {
                throw new Error(`Token was not provided`);
            }

            await verifyTokenAndGetExpirationCountdown(stateWrapper.token);

            /* If token is valid, append it to the request */
            req.headers.Authorization = `Bearer ${stateWrapper.token}`;

        } catch (e) {
            console.log(`Error during token interceptor`, e);

            /* Await for the return of a new token */
            const callbackOnDone = enqueueTokenCallback();

            /* Avoid multiple renewals at the same time */
            if (!(stateWrapper.isLoading)) {
                // Do NOT use await here 
                renewToken();
            } else {
                console.log('skipped calling renewToken because it is already in progress');
            }

            await callbackOnDone;

            /* At this point, the token has been updated */
            req.headers.Authorization = `Bearer ${stateWrapper.token}`;
        }

        return req;
    }
}