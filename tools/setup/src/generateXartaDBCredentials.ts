import { getXartaDBPasswordPrompt, getXartaDBUserPrompt } from './utils';


export async function generateXartaDBCredentials() {

    const xartaCredentials = {
        user: await getXartaDBUserPrompt(),
        password: await getXartaDBPasswordPrompt(),
    };

    return xartaCredentials;
}


