import { Scraper } from "@the-convocation/twitter-scraper";
import * as dotenv from "dotenv";
import * as readline from 'readline';
import * as fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    console.log('Starting the script...');
    dotenv.config();
    
    try {
        // Get username input (remove @ if included)
        const username = (await question('Enter Twitter username (with or without @): ')).replace('@', '');
        
        // Get number of tweets
        const tweetCountInput = await question('How many tweets do you want to fetch? (default: 10) ');
        const tweetCount = parseInt(tweetCountInput || "10");
        
        if (!username) {
            console.error("Username cannot be empty");
            rl.close();
            process.exit(1);
        }

        console.log(`\nFetching ${tweetCount} tweets from @${username}...`);
        
        const scraper = new Scraper();
        
        // Login using credentials from .env
        const twitterUsername = process.env.TWITTER_USERNAME;
        const twitterPassword = process.env.TWITTER_PASSWORD;
        
        if (twitterUsername && twitterPassword) {
            console.log('Attempting to login to Twitter...');
            try {
                await scraper.login(twitterUsername, twitterPassword);
                console.log('Successfully logged in to Twitter');
            } catch (loginError) {
                console.error('Failed to login:', loginError);
            }
        }

        const tweets = [];
        let count = 0;
        
        console.log('Starting to fetch tweets...');
        
        try {
            for await (const tweet of scraper.getTweets(username, tweetCount)) {
                if (tweet) {
                    tweets.push({
                        id: tweet.id,
                        text: tweet.text || '',
                        time: tweet.timeParsed,
                        likes: tweet.likes,
                        retweets: tweet.retweets,
                        replies: tweet.replies,
                        views: tweet.views,
                        isRetweet: tweet.isRetweet,
                        isReply: tweet.isReply
                    });
                    count++;

                    // Only log progress every 100 tweets
                    if (count % 100 === 0) {
                        console.log(`Fetched ${count} tweets...`);
                    }
                }
            }
        } catch (fetchError) {
            console.error('Error during tweet fetching:', fetchError);
        }
        
        console.log(`\nFetched ${count} tweets successfully.`);
        
        if (tweets.length === 0) {
            console.log('No tweets were fetched. This might be due to rate limiting or authentication issues.');
            rl.close();
            return;
        }
        
        // Print tweets to console
        console.log(JSON.stringify(tweets, null, 2));
        
        // Write cleaned tweet texts to file
        const tweetTexts = tweets
            .map(tweet => (tweet.text || '').replace(/\n+/g, ' ').trim())
            .filter(text => text.length > 0)
            .join('\n');
        
        const fileName = `tweets_${username}_${new Date().toISOString().split('T')[0]}.txt`;
        fs.writeFileSync(fileName, tweetTexts);
        console.log(`\nTweet texts have been saved to ${fileName}`);
        
    } catch (error: any) {
        console.error("Error details:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        rl.close();
        process.exit(1);
    }
    
    rl.close();
}

main().catch(console.error);
