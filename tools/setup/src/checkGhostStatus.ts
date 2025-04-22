import axios from 'axios';
import ora from 'ora';
import { delay, SetupStatus } from './utils';
import chalk from 'chalk';

export async function checkGhostStatus({ INTERNAL_CONTAINER_NAME }: { INTERNAL_CONTAINER_NAME: string }, attemptCount = 0, prevSpinner: ora.Ora | null = null) {
  // Check if Ghost is already set up
  const spinner = prevSpinner || ora('Checking Ghost setup status...').start();
  let setupResponse;

  try {
    setupResponse = await axios.get<SetupStatus>(
      // We are using http because this is an internal request
      `http://${INTERNAL_CONTAINER_NAME}/ghost/api/admin/authentication/setup/`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    spinner.succeed('Ghost setup status checked');

    return setupResponse;
  } catch (error) {
    spinner.text = chalk.gray(`Waiting for Ghost container to be ready (${chalk.whiteBright(`attempt=${attemptCount}`)}), retrying every 5 seconds...`)

    await delay(5000);

    return checkGhostStatus({ INTERNAL_CONTAINER_NAME }, attemptCount + 1, spinner);

  }

}
