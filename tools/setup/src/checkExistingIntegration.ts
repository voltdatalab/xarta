import ora from "ora";
import { Integration, IntegrationsResponse } from "./utils";
import axios from "axios";
import chalk from "chalk";

export async function checkExistingIntegration(INTERNAL_CONTAINER_NAME: string, sessionCookie: string) {
    const integrationsSpinner = ora('Checking for existing Xarta integration...').start();
    let existingXartaIntegration: Integration | null = null;
  
    try {
      const integrationsResponse = await axios.get<IntegrationsResponse>(
        // We are using http because this is an internal request
        `http://${INTERNAL_CONTAINER_NAME}/ghost/api/admin/integrations/?include=api_keys%2Cwebhooks`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `ghost-admin-api-session=${sessionCookie}`
          }
        }
      );
  
      // Check if Xarta integration already exists
      existingXartaIntegration = integrationsResponse.data.integrations.find(
        integration => integration.type === 'custom' && integration.name === 'Xarta'
      ) || null;
  
      if (existingXartaIntegration) {
        integrationsSpinner.succeed('Found existing Xarta integration');
      } else {
        integrationsSpinner.succeed('No existing Xarta integration found');
      }
    } catch (error) {
      integrationsSpinner.fail('Failed to check for existing integrations');
      console.error(chalk.red('Error checking integrations:'), error);
      process.exit(1);
    }
    return existingXartaIntegration;
  }