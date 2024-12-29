# App ID Finder for Google Play

This project is a CLI application that helps you find similar apps on the Google Play Store based on a given app name. It retrieves app IDs and additional information about similar apps.

## Features

- Search for similar apps by name
- Displays app ID and additional information
- Colorful terminal output for better readability

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/lyssadev/app-id-finder-googleplay.git
cd app-id-finder-googleplay
npm install
```

## Usage

Run the application using Node.js:

```bash
node src/index.js
```

You will be prompted to enter the name of the app you want to find similar apps for. After entering the app name, the application will display a list of 5 similar apps along with their IDs and additional information.

## Example

```bash
Enter the name of the app: Instagram
```

Output:

```
1. App Name: Instagram Lite
   App ID: com.instagram.lite
   Rating: 4.5
   Developer: Instagram

2. App Name: Facebook
   App ID: com.facebook.katana
   Rating: 4.2
   Developer: Facebook

...
```

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements.

## License

This project is licensed under the ISC License.

## Made By lyssadev