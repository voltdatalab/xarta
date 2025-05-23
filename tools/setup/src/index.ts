import { Command } from 'commander';
import chalk from 'chalk';
import { Integration, saveEnv } from './utils';
import { checkGhostStatus } from './checkGhostStatus';
import { ensureInitialGhostSetup } from './ensureInitialGhostSetup';
import { ensureAuthenticated } from './ensureAuthenticated';
import { checkExistingIntegration } from './checkExistingIntegration';
import { createIntegrationIfNeeded } from './createIntegrationIfNeeded';
import { generateXartaDBCredentials } from './generateXartaDBCredentials';
import { pressAnyKeyToContinue } from './pressAnyKeyToContinue';
import { verifyEnvVar } from './verifyEnvVar';

const main = async () => {
  const program = new Command();

  program
    .name('xarta-setup')
    .description('Xarta Setup CLI tool')
    .version('1.0.0')
    .requiredOption('--internal-container <name>', 'Internal container name')
    .option('--real-host <host>', 'Real host value')
    .option('--name <name>', 'Admin full name')
    .option('--email <email>', 'Admin email')
    .option('--password <password>', 'Admin password (will generate if not provided)')
    .option('--site-title <title>', 'Blog title')
    .option('--xarta-db-user <user>', 'Xarta Database User')
    .option('--xarta-db-password <password>', 'Xarta Database Password')
    .option('--cap-rover', 'Automate setup options for CapRover deployment')
    .parse(process.argv);

  const options = program.opts();

  // Extract required parameters
  const INTERNAL_CONTAINER_NAME = options.internalContainer;
  const REAL_HOST = options.realHost;

  console.log('\n');
  console.log(`🚀 ${chalk.magentaBright(`Xarta Setup Starting`)}`);
  console.log(chalk.gray('----------------------------------------\n'));

  console.log(chalk.gray('Running environment variable checks:'));
  const env1 = verifyEnvVar('PROJECT_NAME');
  const env2 = verifyEnvVar('GHOST_DB_PASSWORD');
  const env3 = verifyEnvVar('PUBLIC_URL');

  if (!env1 || !env2 || !env3) {
    console.log(chalk.blue(`\nDefine the missing variables in your ${chalk.bold(`.env`)} file and restart the setup script to continue.`));
    console.log(chalk.blue('For more information, please check the documentation\n'));
    process.exit(1);
  }
  else {
    console.log((`\n${chalk.green(`✔`)} All environment variables required for the setup have been defined, proceeding...\n`));
  }

  console.log(chalk.gray('----------------------------------------\n'));

  console.log(`${chalk.gray(`We will attempt to connect to Ghost via ${chalk.magentaBright(`http://${INTERNAL_CONTAINER_NAME}`)}`)}\n`);
  console.log(`${chalk.blue(`Please wait, this can take over a minute...`)}`);

  const setupResponse = await checkGhostStatus({ INTERNAL_CONTAINER_NAME });

  const isSetupNeeded = !setupResponse.data.setup[0].status;

  let { userCredentials, sessionCookie } = await ensureInitialGhostSetup(isSetupNeeded, options, INTERNAL_CONTAINER_NAME);

  // Login to get session cookie
  sessionCookie = await ensureAuthenticated(INTERNAL_CONTAINER_NAME, userCredentials, sessionCookie);

  // Check for existing integrations
  let existingXartaIntegration: Integration | null = await checkExistingIntegration(INTERNAL_CONTAINER_NAME, sessionCookie);

  // Create new integration if needed
  let finalIntegration: Integration = await createIntegrationIfNeeded(existingXartaIntegration, INTERNAL_CONTAINER_NAME, sessionCookie);




  // Extract API keys
  const contentApiKey = finalIntegration.api_keys.find(key => key.type === 'content');
  const adminApiKey = finalIntegration.api_keys.find(key => key.type === 'admin');


  let xartaDBCredentials = options.capRover ? null : await generateXartaDBCredentials();


  // Security reminder for password
  if (isSetupNeeded) {
    console.log('\n');
    console.log(chalk.gray('----------------------------------------'));
    console.log(chalk.yellow('🔒 Security Reminder:'));
    console.log(chalk.gray('----------------------------------------'));
    console.log(chalk.yellow(`⚠️  Please store your admin password securely:`));
    console.log(chalk.white(`Email:    ${chalk.cyan(userCredentials.email)}`));
    console.log(chalk.white(`Password: ${chalk.cyan(userCredentials.password)}`));
    console.log(chalk.yellow(`We recommend changing your email and password after setup is complete.`));
    console.log(chalk.gray('----------------------------------------'));
    
    if (!(options.capRover)) {
      console.log('\n');
      await pressAnyKeyToContinue(chalk.blue("Press any key to continue after storing your password..."));
    }
    console.log('\n');
  }  

  console.log('\n');

  // Create .env file example
  const envContent = `# Ghost Integration Environment Variables
GHOST_CONTENT_API_KEY='${contentApiKey?.secret || ''}'
GHOST_ADMIN_API_KEY='${adminApiKey?.secret || ''}'

${options.capRover ? `` : `# Xarta DB Environment Variables
XARTA_DB_USER='${xartaDBCredentials?.user || ''}'
XARTA_DB_PASSWORD='${xartaDBCredentials?.password || ''}'
`}`;

  console.log(chalk.gray('----------------------------------------'));
  console.log('Environment Variables:');
  console.log(chalk.bold(chalk.gray('.env')));
  console.log(chalk.gray('----------------------------------------\n'));
  console.log(envContent);
  console.log(chalk.gray('----------------------------------------'));

  saveEnv(envContent);

  console.log('\n');

  console.log(chalk.magentaBright('🎉 Xarta Setup Complete!'));
  console.log(chalk.gray('----------------------------------------'));
  console.log('\nCall the ./up.sh script to start Xarta with your new configuration 🎉');

  if (options.capRover){
    // Do not exit the program since CapRover would keep restarting it.
    // Schedule a function to run every hour (3600000 milliseconds).
    setInterval(() => {
      // Do nothing.
    }, 3600000);
  }

};

main().catch(error => {
  console.error(chalk.red('Unexpected error:'), error);
  process.exit(1);
});


