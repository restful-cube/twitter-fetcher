# Twitter Fetcher

A simple command-line tool to fetch tweets from any Twitter user using TypeScript.

## Features

- Fetch tweets from any public Twitter account
- Access private accounts with authentication
- Save tweets to a text file
- Configurable number of tweets to fetch

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Create a .env file with your Twitter credentials
   ```
   TWITTER_USER=your_twitter_username
   TWITTER_PASSWORD=your_twitter_password
   ```

   **Authentication Notes:**
   - Authentication is required to access private accounts
   - Authentication may help avoid rate limiting on large requests
   - You can copy the provided .env.example file as a template

## Usage

Run the script:
```bash
yarn ts-node fetch-tweets.ts
```

Follow the prompts to enter:
1. Twitter username (with or without @)
2. Number of tweets to fetch

The script will fetch the tweets and save them to a text file in the current directory.

## Authentication Details

The tool uses basic username/password authentication to access Twitter. This authentication:

- Is **required** for accessing private accounts you follow
- Helps avoid rate limiting for large requests
- Provides access to more tweet metadata

To set up authentication:

1. Create or edit the .env file in the project root
2. Add your Twitter credentials as shown in the Installation section
3. Make sure your .env file is not committed to version control

## Security Notice

**Important:** Keep your credentials secure:

- Never commit your .env file to version control
- The .env file is already added to .gitignore for your protection
- Consider changing your password regularly
- Use a password that is not used for other services

The tool stores your credentials only in the local .env file and uses them only for Twitter authentication.
