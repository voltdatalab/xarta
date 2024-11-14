import { redirectToLogin } from "./redirectToLogin";
import { requestNewToken } from "./requestNewToken";
import { stateWrapper } from "./stateWrapper";

export const renewToken = async () => {

    stateWrapper.isLoading = true;

    try {
        const receivedToken = await requestNewToken();

        if (!(stateWrapper.config.storageKey)) {
            throw new Error(`Missing config.storageKey`);
        }

        if (!(stateWrapper.config.persistenceChoice)) {
            throw new Error(`Missing config.persistenceChoice`);
        }

        // Update the token in session/local storage
        stateWrapper.config.persistenceChoice.setItem(stateWrapper.config.storageKey, receivedToken);

        // Propagate the token to the internal state
        stateWrapper.token = receivedToken;

        // Call all pending functions
        stateWrapper.queue.forEach(fn => fn(stateWrapper.token as string));
        stateWrapper.queue = [];
    }

    catch (error) {
        // If there's an error in renewing the token, handle it (e.g., redirect to login page).
        console.log(error);
        redirectToLogin();
    }

    finally {
        stateWrapper.isLoading = false;
    }
};
