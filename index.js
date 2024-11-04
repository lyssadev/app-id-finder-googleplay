



import chalk from 'chalk';
import ora from 'ora';

async function findAppIds(searchTerm, limit = 5) {
  try {
    const gplay = await import('google-play-scraper');
    const results = await gplay.default.search({
      term: searchTerm,
      num: limit
    });

    return results.map(app => ({
      appId: app.appId,
      title: app.title,
      developer: app.developer,
      score: app.score,
      icon: app.icon
    }));
  } catch (error) {
    console.error(chalk.red('Error searching for apps:', error.message));
    return [];
  }
}

async function searchApps() {
  const readline = (await import('readline')).createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => readline.question(query, resolve));

  console.log(chalk.bold.green('Welcome to the Google Play App ID Finder!'));
  console.log(chalk.yellow('Enter app names to search, or type "exit" to quit.\n'));

  while (true) {
    const searchTerm = await question(chalk.cyan('Enter an app name to search: '));
    
    if (searchTerm.toLowerCase() === 'exit') {
      console.log(chalk.bold.green('Thank you for using the App ID Finder. Goodbye!'));
      break;
    }

    const spinner = ora('Searching for apps...').start();
    const appResults = await findAppIds(searchTerm);
    spinner.stop();

    if (appResults.length === 0) {
      console.log(chalk.yellow('\nNo results found.\n'));
    } else {
      console.log(chalk.bold.green('\nSearch Results:\n'));
      appResults.forEach((app, index) => {
        console.log(chalk.bold.white(`${index + 1}. ${app.title}`));
        console.log(chalk.cyan(`   App ID: ${chalk.bold(app.appId)}`));
        console.log(chalk.magenta(`   Developer: ${app.developer}`));
        console.log(chalk.yellow(`   Rating: ${app.score.toFixed(1)} ⭐`));
        console.log(chalk.blue(`   Icon URL: ${app.icon}`));
        console.log('');
      });
    }
  }

  readline.close();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  searchApps();
}

export { findAppIds };


