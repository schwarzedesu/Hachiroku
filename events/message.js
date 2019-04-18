const fs = require('fs');
/*const avatar = require('../commands/avatar');
const joinVoiceChannel = require('../commands/joinVoiceChannel');
const kick = require('../commands/kick');
const think = require('../commands/think');*/

module.exports = (client, message, member) => {

  console.log('Member: ' + member);

  fs.readdir('./commands/', (err, files) => {
    files.forEach(file => {
      const eventHandler = require(`../commands/${file}`);
      const eventName = file.split('.')[0];
      client.on(eventName, (...args) => eventHandler(client, ...args));
    })
  });

  if (message.content === '!join') {
    return joinVoiceChannel(message, member);
  }

  /*if (message.content === '!think') {
    return think(message);
  }*/

  if (message.content.startsWith('!kick')) {
    return kick(message);
  }

  if (message.content === '!ping') {
    return message.reply('pong');
  }

  if (message.content.startsWith('!avatar')) {
    return avatar(message);
  }

  return;

}
