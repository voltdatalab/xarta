import axios from "axios";
import { Integration, IntegrationsResponse } from "./utils";
import ora from "ora";
import chalk from "chalk";

export async function createIntegrationIfNeeded(existingXartaIntegration: Integration | null, INTERNAL_CONTAINER_NAME: string, sessionCookie: string) {
    let finalIntegration: Integration;

    if (!existingXartaIntegration) {
        const createIntegrationSpinner = ora('Creating new Xarta integration...').start();

        try {
            const createResponse = await axios.post<IntegrationsResponse>(
                // We are using http because this is an internal request
                `http://${INTERNAL_CONTAINER_NAME}/ghost/api/admin/integrations/?include=api_keys%2Cwebhooks`,
                {
                    integrations: [{
                        name: 'Xarta'
                    }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': `ghost-admin-api-session=${sessionCookie}`
                    }
                }
            );

            finalIntegration = createResponse.data.integrations[0];
            createIntegrationSpinner.succeed('Created new Xarta integration');
        } catch (error) {
            createIntegrationSpinner.fail('Failed to create new integration');
            console.error(chalk.red('Error creating integration:'), error);
            process.exit(1);
        }
    } else {
        finalIntegration = existingXartaIntegration;
    }
    return finalIntegration;
}

