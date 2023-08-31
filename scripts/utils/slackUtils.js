const chalk = require('chalk')
const slackifyMarkdown = require('slackify-markdown')
const fetch = require('cross-fetch')
const fs = require('node:fs/promises')


const getTextFromFile = (filePath) => fs.readFileSync(filePath, 'utf8')
if (typeof window !== 'undefined') {

const BrowserFS = require('browserfs');

const fs = require('fs');
BrowserFS.FileSystem.InMemory.Create((err, inMemoryFS) => {
  if (err) throw err;
  fs.mkdirSync('/sandbox');
  fs.mount('/sandbox', inMemoryFS);
  fs.writeFileSync('/sandbox/test.txt', 'Hello, BrowserFS!');
  // Use fs methods to read/write files
});
fs.readFile('/sandbox/test.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data); // Output: Hello, BrowserFS!
});
}
const sendMessageToSlack = async (channel, mrkdwn) => {
  const formattedText = slackifyMarkdown(mrkdwn)
  const payload = JSON.stringify({
    channel,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: formattedText,
        },
      },
    ],
  })

  fetch('https://alert.highoutput.io/alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  })
    .then((result) => {
      console.log(chalk.green(`Changelog pushed to slack channel ${channel}`))
    })
    .catch((error) => {
      throw error
    })
}

module.exports = {
  getTextFromFile,
  sendMessageToSlack,
}
