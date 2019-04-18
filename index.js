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

// For log purposes
client.on('error', console.error);

client.login(process.env.token);
