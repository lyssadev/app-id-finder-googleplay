# App ID Finder - Google Play

A powerful CLI tool to find and analyze similar apps on Google Play Store with enhanced features and beautiful terminal output.

## Features

- 🔍 Smart app search with multiple criteria
- 📊 Detailed app information display
- 💾 Intelligent caching for faster repeated searches
- 🌈 Beautiful and colorful terminal output
- 🔄 Configurable settings
- 📋 Export results in JSON format
- 🌍 Multi-language support
- 🏷️ Price filtering (free/paid/all)
- 📱 Comprehensive app details
- ⚡ Fast and efficient

## Installation

```bash
npm install -g app-id-finder-googleplay
```

## Usage

### Search for Apps

```bash
# Basic search
app-id-finder search "Minecraft"

# Search with options
app-id-finder search "Minecraft" -n 10 -l en -c us -s rating -p free

Options:
  -n, --num <number>      Number of results to return
  -l, --lang <code>       Language code (e.g., en, es)
  -c, --country <code>    Country code (e.g., us, uk)
  -s, --sort <type>       Sort by (relevance, rating, downloads, newest)
  -p, --price <type>      Filter by price (all, free, paid)
  --json                  Output results in JSON format
```

### Get Detailed App Information

```bash
app-id-finder details "com.mojang.minecraftpe"

Options:
  --json                  Output results in JSON format
```

### Manage Configuration

```bash
# Show current configuration
app-id-finder config --show

# Reset configuration to defaults
app-id-finder config --reset

# Set a configuration value
app-id-finder config --set language=es
```

### Manage Cache

```bash
# Clear the cache
app-id-finder cache --clear
```

## Configuration Options

- `theme`: UI theme (light/dark/auto)
- `language`: Default language code
- `country`: Default country code
- `maxResults`: Default number of search results
- `cacheTimeout`: Cache timeout in milliseconds
- `sortPreference`: Default sort order

## Development

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/app-id-finder-googleplay.git

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [google-play-scraper](https://github.com/facundoolano/google-play-scraper) - For the Google Play Store data
- [Commander.js](https://github.com/tj/commander.js) - For the CLI framework
- [chalk](https://github.com/chalk/chalk) - For terminal styling