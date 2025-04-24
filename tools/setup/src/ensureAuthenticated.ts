import chalk from 'chalk';
import ora from 'ora';
import { getAdminEmailPrompt, getAdminPasswordPrompt, UserSetup } from './utils';
import axios, { AxiosError } from 'axios';


export async function ensureAuthenticated(INTERNAL_CONTAINER_NAME: string, userCredentials: UserSetup, sessionCookie: string) {
    const loginSpinner = ora('Logging in to Ghost admin...').start();

    try {
        const loginResponse = await axios.post(
            // We are using http because this is an internal request
            `http://${INTERNAL_CONTAINER_NAME}/ghost/api/admin/session/`,
            {
                username: userCredentials.email,
                password: userCredentials.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                maxRedirects: 0,
                validateStatus: (status) => status === 201
            }
        );

        // Extract the session cookie
        const cookies = loginResponse.headers['set-cookie'];
        if (cookies && cookies.length > 0) {
            const sessionCookieMatch = cookies[0].match(/ghost-admin-api-session=([^;]+)/);
            if (sessionCookieMatch && sessionCookieMatch[1]) {
                sessionCookie = sessionCookieMatch[1];
                loginSpinner.succeed('Logged in successfully');
            } else {
                loginSpinner.fail('Failed to extract session cookie');
                process.exit(1);
            }
        } else {
            loginSpinner.fail('No session cookie returned');
            process.exit(1);
        }
    } catch (error) {
        loginSpinner.fail('Failed to login');

        console.error(chalk.red('Error during login:'), (error as AxiosError<any>)?.response?.data?.errors || error);

        console.log('\n');

        // TODO: Remove name and blogtitle
        const forceRepromptCredentials: UserSetup = {
            name: '',
            email: await getAdminEmailPrompt(),
            password: await getAdminPasswordPrompt(),
            blogTitle: ''
        };

        console.log('\n');

        return await ensureAuthenticated(INTERNAL_CONTAINER_NAME, forceRepromptCredentials, sessionCookie)
    }
    return sessionCookie;
}

