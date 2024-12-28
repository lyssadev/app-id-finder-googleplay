import express from 'express';
import chalk from 'chalk';
import ora from 'ora';

const app = express();
const port = process.env.PORT || 3000;

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
      icon: app.icon,
      size: app.size,
      url: app.url
    }));
  } catch (error) {
    console.error(chalk.red('Error searching for apps:', error.message));
    return [];
  }
}

app.get('/api/search', async (req, res) => {
  const { term, limit } = req.query;
  if (!term) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  const spinner = ora('Searching for apps...').start();
  const appResults = await findAppIds(term, limit ? parseInt(limit, 10) : 5);
  spinner.stop();

  res.json(appResults);
});

app.listen(port, () => {
  console.log(chalk.bold.green(`Server is running on http://localhost:${port}`));
});

export { findAppIds };
