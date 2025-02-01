import { Command } from 'commander';
import { config } from '../config';
import { scraperService } from '../services/scraper';
import { logger } from '../utils/logger';
import { SearchOptions, UserConfig } from '../types';
import Table from 'cli-table3';
import chalk from 'chalk';
import ora from 'ora';

const program = new Command();

program
  .name('app-id-finder')
  .description('A powerful CLI tool to find and analyze similar apps on Google Play Store')
  .version('2.0.0');

program
  .command('search')
  .description('Search for apps on Google Play Store')
  .argument('<query>', 'The app name or search term')
  .option('-n, --num <number>', 'Number of results to return', String(config.get('maxResults')))
  .option('-l, --lang <code>', 'Language code (e.g., en, es)', config.get('language'))
  .option('-c, --country <code>', 'Country code (e.g., us, uk)', config.get('country'))
  .option('-s, --sort <type>', 'Sort by (relevance, rating, downloads, newest)', config.get('sortPreference'))
  .option('-p, --price <type>', 'Filter by price (all, free, paid)', 'all')
  .option('--json', 'Output results in JSON format')
  .action(async (query: string, options) => {
    const spinner = ora('Searching for apps...').start();

    try {
      const searchOptions: SearchOptions = {
        term: query,
        num: parseInt(options.num),
        lang: options.lang,
        country: options.country,
        sort: options.sort,
        price: options.price,
        fullDetail: true,
      };

      const result = await scraperService.searchApps(searchOptions);

      spinner.stop();

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
        return;
      }

      const table = new Table({
        head: [
          chalk.blue('App Name'),
          chalk.blue('App ID'),
          chalk.blue('Developer'),
          chalk.blue('Rating'),
          chalk.blue('Price'),
        ],
        colWidths: [40, 30, 30, 10, 15],
      });

      result.apps.forEach(app => {
        table.push([
          chalk.green(app.title),
          app.id,
          app.developer,
          chalk.yellow(app.score.toFixed(1)),
          app.free ? chalk.green('Free') : chalk.red(app.price || 'N/A'),
        ]);
      });

      console.log(table.toString());
      console.log(chalk.cyan(`\nFound ${result.total} apps matching "${query}"`));
    } catch (error) {
      spinner.fail('Error searching for apps');
      logger.error('Search command error:', error);
      process.exit(1);
    }
  });

program
  .command('details')
  .description('Get detailed information about a specific app')
  .argument('<appId>', 'The app ID from Google Play Store')
  .option('--json', 'Output results in JSON format')
  .action(async (appId: string, options) => {
    const spinner = ora('Fetching app details...').start();

    try {
      const app = await scraperService.getAppDetails(appId);
      spinner.stop();

      if (options.json) {
        console.log(JSON.stringify(app, null, 2));
        return;
      }

      console.log('\n' + chalk.blue.bold('App Details:'));
      console.log(chalk.green.bold('Name: ') + app.title);
      console.log(chalk.green.bold('Developer: ') + app.developer);
      console.log(chalk.green.bold('Rating: ') + chalk.yellow(app.score.toFixed(1)));
      console.log(chalk.green.bold('Price: ') + (app.free ? chalk.green('Free') : chalk.red(app.price)));
      console.log(chalk.green.bold('Downloads: ') + app.downloads);
      console.log(chalk.green.bold('Version: ') + app.version);
      console.log(chalk.green.bold('Last Updated: ') + app.lastUpdated);
      console.log(chalk.green.bold('Size: ') + app.size);
      console.log(chalk.green.bold('Android Version: ') + app.androidVersion);
      console.log(chalk.green.bold('Content Rating: ') + app.contentRating);
      console.log('\n' + chalk.green.bold('Description:'));
      console.log(app.description);
    } catch (error) {
      spinner.fail('Error fetching app details');
      logger.error('Details command error:', error);
      process.exit(1);
    }
  });

program
  .command('config')
  .description('Manage configuration settings')
  .option('--show', 'Show current configuration')
  .option('--reset', 'Reset configuration to defaults')
  .option('--set <key=value>', 'Set a configuration value')
  .action((options) => {
    if (options.show) {
      const currentConfig = config.getAll();
      console.log(chalk.blue.bold('\nCurrent Configuration:'));
      Object.entries(currentConfig).forEach(([key, value]) => {
        console.log(chalk.green.bold(`${key}: `) + value);
      });
    } else if (options.reset) {
      config.reset();
      console.log(chalk.green('Configuration reset to defaults'));
    } else if (options.set) {
      const [key, value] = options.set.split('=');
      if (!key || !value) {
        console.error(chalk.red('Invalid format. Use --set key=value'));
        process.exit(1);
      }
      if (isValidConfigKey(key)) {
        config.set(key, value);
        console.log(chalk.green(`Configuration updated: ${key} = ${value}`));
      } else {
        console.error(chalk.red(`Invalid configuration key: ${key}`));
        console.log(chalk.yellow('\nValid keys are:'));
        console.log(Object.keys(config.getAll()).join(', '));
        process.exit(1);
      }
    } else {
      program.help();
    }
  });

// Helper function to validate config keys
function isValidConfigKey(key: string): key is keyof UserConfig {
  return Object.keys(config.getAll()).includes(key);
}

program
  .command('cache')
  .description('Manage cache')
  .option('--clear', 'Clear the cache')
  .action((options) => {
    if (options.clear) {
      scraperService.clearCache();
      console.log(chalk.green('Cache cleared successfully'));
    } else {
      program.help();
    }
  });

export const cli = program; 