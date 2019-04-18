require('dotenv').config()

const { Client, Attachment, RichEmbed } = require('discord.js');
const client = new Client();
const fs = require('fs');

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  })
});

client.on('ready', () => {
  console.log(`${client.user.tag} is ready!`);
});

client.on('error', console.error);

client.on('message', message => {
    if (message.content === '!think') {
        const attachment = new Attachment('https://imgur.com/bsEdspM');
        //message.channel.send(`${message.user.username},`, attachment);
        message.channel.send(attachment);
    }
});

client.login(process.env.token);
