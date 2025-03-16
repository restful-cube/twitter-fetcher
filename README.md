# Twitter Fetcher

A simple command-line tool to fetch tweets from any Twitter user using TypeScript.

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Create a .env file with your Twitter credentials (optional)
   ```
   TWITTER_COOKIES=your_cookies_here
   ```

## Usage

Run the script:
```bash
yarn ts-node fetch-tweets.ts
```

Follow the prompts to enter:
1. Twitter username (with or without @)
2. Number of tweets to fetch

The script will fetch the tweets and save them to a text file in the current directory.

## Features

- Fetch tweets from any public Twitter account
- Save tweets to a text file
- Optional authentication support
- Configurable number of tweets to fetch
