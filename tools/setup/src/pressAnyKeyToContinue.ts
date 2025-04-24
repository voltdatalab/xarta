export function pressAnyKeyToContinue(prompt = "Press any key to continue..."): Promise<void> {
    return new Promise((resolve) => {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdout.write(prompt);
  
      const onData = () => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        process.stdout.write('\n');
        resolve();
      };
  
      process.stdin.on('data', onData);
    });
  }
  