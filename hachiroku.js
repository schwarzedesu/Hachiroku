require('dotenv').config()

const { Client } = require('discord.js');
const client = new Client();
const fs = require('fs');

// Queue map for music commands
const queue = new Map();

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  })
});

module.exports = { queue, enumerate }

client.login(process.env.token);

// Gives nice numbers to whatever
function* enumerate(iterable) {
  let idx = 1;

  for (const i of iterable) {
    yield [idx, i];
    idx++;
  }
}
