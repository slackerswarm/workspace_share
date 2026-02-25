require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });

const client = new TwitterApi({
  appKey: '4W17wYfzeQVwE7R2Gk370yFwO',  // From TOOLS.md
  appSecret: 'I1BVGaUmnGqAxJw40i9sJvfM0RTXDcNHDo7UO2or3AzacXR1C8',
});

async function authorize() {
  const { url, oauth_token, oauth_token_secret } = await client.generateAuthLink('oAuth/callback');  // Generates auth URL
  console.log(`Authorize at: ${url}`);
  readline.question('Enter verifier (PIN): ', async (verifier) => {
    const { accessToken, accessSecret } = await client.login(verifier);  // Logs in with verifier
    require('fs').appendFileSync('.env', `\nX_ACCESS_TOKEN=${accessToken}\nX_ACCESS_SECRET=${accessSecret}\n`);
    console.log('Access tokens saved to .env. Run promo.js now.');
    readline.close();
  });
}

authorize();