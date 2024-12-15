# Google Play App ID Finder

This Node.js script allows you to search for and retrieve App IDs and other information about apps on the Google Play Store.

## Features

- Search for apps by name
- Retrieve App IDs, developer names, ratings, and icon URLs
- Colorful and interactive command-line interface
- Multiple searches in a single session
- Logs search terms for better tracking

## Requirements

- Node.js
- npm

## Installation

1. Download the `index.js` file.
2. Install the required packages:

```bash
npm install chalk ora google-play-scraper
```

## Usage

1. Run the script:

```bash
node index.js
```

2. Enter the name of the app you want to search for when prompted.
3. View the search results, including App IDs and other information.
4. Search for another app or type 'exit' to quit the program.

## How it works

The script uses the `google-play-scraper` package to search the Google Play Store and retrieve app information. It presents the results in a user-friendly format using the `chalk` library for colored output and `ora` for a loading spinner. Additionally, it logs the search terms for better tracking of user queries.
