const { Attachment } = require('discord.js');

module.exports = message => {
  const attachment = new Attachment('https://i.imgur.com/bsEdspM.png');
  message.channel.send(attachment);
}
