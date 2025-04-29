import chalk from "chalk";
import ora from 'ora';
import axios, { AxiosError } from 'axios';
import { getAdminEmailPrompt, getAdminPasswordPrompt, UserSetup } from "./utils";
import { prompt, generateSecurePassword } from './utils';

export async function ensureInitialGhostSetup(isSetupNeeded: boolean, options: { [key: string]: any; }, INTERNAL_CONTAINER_NAME: string) {
    let userCredentials: UserSetup;
    let sessionCookie = '';

    if (isSetupNeeded) {
        console.log('\n- Ghost needs initial setup. Please enter:');

        // Automatically populate for Caprover
        // TODO: Allow custom values
        if (options.capRover) {
            options.siteTitle = 'Xarta';
            options.name = 'Admin User';
            options.email = `admin-${generateSecurePassword(6)}@example.com`;
            options.password = generateSecurePassword();
        }

        // Use provided credentials or prompt for them
        userCredentials = {
            siteTitle: options.siteTitle || await prompt(chalk.blue('- Your Xarta Website title: '), "Xarta"),
            name: options.name || await prompt(chalk.blue('- Your full name: ')),
            email: options.email || await prompt(chalk.blue('- Your email: ')),
            password: options.password || '',
        };

        // Generate password if not provided
        if (!userCredentials.password) {
            
            const useGenerated = (await prompt(chalk.blue('- Generate secure password? (Y/n): '))).toLowerCase() !== 'n';

            if (useGenerated) {
                userCredentials.password = generateSecurePassword();
                console.log(`Generated password: ${chalk.green(chalk.bold(userCredentials.password))}`);
            } else {
                userCredentials.password = await prompt(chalk.blue('  - Enter password (min 10 characters): '));

                while (userCredentials.password.length < 10) {
                    console.log(chalk.red('Password must be at least 10 characters'));
                    userCredentials.password = await prompt(chalk.blue('  - Enter password (min 10 characters): '));
                }
            }

        }

        // Perform the setup
        const setupSpinner = ora('Setting up Ghost admin account...').start();

        try {

            await axios.post(
                // We are using http because this is an internal request
                `http://${INTERNAL_CONTAINER_NAME}/ghost/api/admin/authentication/setup/`,
                {
                    setup: [{
                        name: userCredentials.name,
                        email: userCredentials.email,
                        password: userCredentials.password,
                        blogTitle: userCredentials.siteTitle
                    }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setupSpinner.succeed('Ghost admin account created successfully');
        } catch (error) {
            setupSpinner.fail('Failed to setup Ghost admin account');
            // TODO: Improve error typing
            console.error(chalk.red('Error during setup:'), (error as AxiosError<any>).response?.data?.errors);

            if (options.capRover) {
                // Avoid infinite loops for non-interactive setup
                process.exit(1);
            }

            return await ensureInitialGhostSetup(isSetupNeeded, options, INTERNAL_CONTAINER_NAME);
        }
    } else {
        console.log(`\n${chalk.green(`✔`)} Ghost is already set up\n`);

        // Prompt for login credentials
        userCredentials = {
            name: '',
            email: options.email || await getAdminEmailPrompt(),
            password: options.password || await getAdminPasswordPrompt(),
            siteTitle: ''
        };
        console.log('\n');
    }
    return { userCredentials, sessionCookie };
}