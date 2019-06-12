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

module.exports = { queue, enumerate, isYoutube }

client.login(process.env.token);

// Gives nice numbers to whatever
function* enumerate(iterable) {
  let idx = 1;

  for (const i of iterable) {
    yield [idx, i];
    idx++;
  }
}

// RegExp for youtube links checking
function* isYoutube(link) {
  var regex = /^\w{11}$/;
  if (regex.test(link)) {
    return true;
  }
  var parsed = url.parse(link, true);
  var id = parsed.query.v;
  if (parsed.hostname === 'youtu.be' ||
  (parsed.hostname === 'youtube.com' ||
  parsed.hostname === 'www.youtube.com') && !id) {
    var s = parsed.pathname.split('/');
    id = s[s.length - 1];
  }
  if (!id) {
    return false;
  }
  if (!regex.test(id)) {
    return false;
  }
  return true;
}
