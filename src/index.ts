#!/usr/bin/env node

import { cli } from './commands';
import { logger } from './utils/logger';

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

try {
  cli.parse(process.argv);
} catch (error) {
  logger.error('Error parsing commands:', error);
  process.exit(1);
} 