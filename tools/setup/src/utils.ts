import chalk from 'chalk';
import * as readline from 'readline';

// Interfaces
export interface SetupStatus {
  setup: {
    status: boolean;
  }[];
}
export interface UserSetup {
  name: string;
  email: string;
  password: string;
  siteTitle: string;
}
interface ApiKey {
  id: string;
  type: string;
  secret: string;
  integration_id: string;
  created_at: string;
  updated_at: string;
}
export interface Integration {
  id: string;
  type: string;
  name: string;
  slug: string;
  description: string | null;
  api_keys: ApiKey[];
}
export interface IntegrationsResponse {
  integrations: Integration[];
}
// Helper to create readline interface
const createInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
};

export const prompt = async (question: string, defaultAnswer?: string): Promise<string> => {
  const rl = createInterface();

  const fullQuestion = defaultAnswer
    ? `${question}${chalk.gray(`[default: ${defaultAnswer}]`)} `
    : question;

  return new Promise((resolve) => {
    rl.question(fullQuestion, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultAnswer || '');
    });
  });
};

// Generate a secure password
export const generateSecurePassword = (length = 40, specialChars = true): string => {
  const normalChars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;
  const charset = specialChars ? normalChars : `${normalChars}!@#$%^&*()-_=+`;
  const charsetLength = charset.length;
  let password = '';

  const cryptoObj = typeof window !== 'undefined' && window.crypto ? window.crypto : require('crypto').webcrypto;
  const randomValues = new Uint32Array(length);
  cryptoObj.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charsetLength;
    password += charset[randomIndex];
  }

  return password;
};

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getAdminEmailPrompt() {
  return await prompt(chalk.blue('Enter admin email: '));
}

export async function getAdminPasswordPrompt() {
  return await prompt(chalk.blue('Enter admin password: '));
}

export async function getXartaDBUserPrompt() {
  return await prompt(chalk.blue('Define a user for Xarta DB connection: '), 'xarta-db-user');
}

export async function getXartaDBPasswordPrompt() {
  return await prompt(chalk.blue('Define a password for Xarta DB connection: '), generateSecurePassword());
}

export async function getGhostDBPasswordPrompt() {
  return await prompt(chalk.blue('Choose a password for Ghost DB connection: '));
}