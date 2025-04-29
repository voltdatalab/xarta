import { getXartaDBPasswordPrompt, getXartaDBUserPrompt } from './utils';


export async function generateXartaDBCredentials() {

    console.log('\nNow, we are going to define some credentials for Xarta Database (Postgres):\n');
    const xartaCredentials = {
        user: await getXartaDBUserPrompt(),
        password: await getXartaDBPasswordPrompt(),
    };

    return xartaCredentials;
}


