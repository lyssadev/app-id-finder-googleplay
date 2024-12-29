const chalk = require('chalk');
const inquirer = require('inquirer');
const { fetchSimilarApps } = require('./utils/scraper');

const logo = `
${chalk.blue('==============================')}
${chalk.green.bold('   App ID Finder - Google Play')}
${chalk.blue('==============================')}
`;

console.log(logo);
console.log(chalk.yellow.bold("Made By lyssadev\n"));

async function main() {
    const { appName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'appName',
            message: chalk.cyan('Enter the name of the app you want to find similar apps for:'),
        },
    ]);

    console.log(chalk.yellow.bold(`\nSearching for apps similar to "${appName}"...\n`));

    try {
        const similarApps = await fetchSimilarApps(appName);
        if (similarApps.length === 0) {
            console.log(chalk.red.bold('No similar apps found.'));
            return;
        }

        console.log(chalk.green.bold('Similar Apps Found:\n'));
        similarApps.forEach((app, index) => {
            console.log(chalk.blue.bold(`${index + 1}. App Name: ${app.title}`));
            console.log(chalk.cyan(`   App ID: ${app.id}`));
            console.log(chalk.magenta(`   Rating: ${app.score}`));
            console.log(chalk.magenta(`   Developer: ${app.developer}`));
            console.log(chalk.green('-----------------------------'));
        });
    } catch (error) {
        console.error(chalk.red.bold('Error fetching similar apps:'), error.message);
    }
}

main();