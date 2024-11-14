import axios from "axios";
import { stateWrapper } from "./stateWrapper";

export const requestNewToken = async () => {

    if (!(stateWrapper.config.tokenEndpoint)) {
        throw new Error(`Missing "tokenEndpoint" in configuration`);
    }

    // Request a new JWT token from the TOKEN_ENDPOINT
    // This request must be made from the same domain as TOKEN_ENDPOINT, or CORS will fail.
    // Note that here we're using the default axios instance, not our custom one
    const newTokenResponse = await axios.get<string>(stateWrapper.config.tokenEndpoint, {
        withCredentials: true,
        responseType: 'text'
    });

    if (newTokenResponse.status !== 200) {
        throw new Error(`Token response was not successful`);
    }

    return newTokenResponse.data;
};
