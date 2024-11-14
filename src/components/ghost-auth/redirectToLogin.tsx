import { stateWrapper } from "./stateWrapper";

export const redirectToLogin = () => {

    if (!(stateWrapper.config.loginURL)) {
        throw new Error(`Missing config.loginURL`);
    }

    // Redirect to the login page.
    window.location.href = stateWrapper.config.loginURL;
};
