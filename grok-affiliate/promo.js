require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');

const client = new TwitterApi({
  appKey: process.env.X_CONSUMER_KEY,
  appSecret: process.env.X_CONSUMER_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

const promos = [
  "Grok: AI that bootstraps like Gen X—edgy, efficient. Affiliate link: " + process.env.AFFILIATE_LINK + " #NoHandouts",
  "Level up your swarm with Grok power. 25% back on referrals. Link: " + process.env.AFFILIATE_LINK + " #BuildItYourself",
  // Add more (5-10) for rotation
];

async function postPromo() {
  try {
    const tweet = promos[Math.floor(Math.random() * promos.length)];
    const response = await client.v1.tweet(tweet);  // Fallback to v1 for OAuth 1.0a compatibility
    fs.appendFileSync('logs.txt', `${new Date()}: Posted: ${tweet} (ID: ${response.id_str})\n`);
    console.log('Promo posted successfully:', response.id_str);
  } catch (err) {
    fs.appendFileSync('logs.txt', `${new Date()}: Error: ${err.message}\n`);
    console.error('Post failed:', err);
  }
}

postPromo();