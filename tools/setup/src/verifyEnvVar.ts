import chalk from 'chalk';

export const verifyEnvVar = (name: string) => {
  const value = process.env[name];
  if (value) {
    console.log(chalk.gray(`- ${chalk.green(`$${name}`)} is not empty;`));
    return true;
  } else {
    console.log(chalk.white(`- ${chalk.red(`$${name}`)} is not defined;`));
    return false;
  }
};
