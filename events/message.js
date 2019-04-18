const fs = require('fs');
var commands = new Map();

module.exports = (client, message) => {

  console.log('Member: ' + message.author.username);

  fs.readdir('./commands/', (err, files) => {
    files.forEach(file => {
      const eventHandler = require(`../commands/${file}`);
      const eventName = file.split('.')[0];
      commands.set(eventName, eventHandler);
    })
  });

  var prefix = '!';

  let commandName = message.content.split(' ')[0];

  if (commandName.startsWith(prefix)) {
    commandName = commandName.substring(prefix.length);
    if (commands.has(commandName)){
      let command = commands.get(commandName);
      return command(message);
    }
  }
}
