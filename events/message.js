const fs = require('fs');
var commands = new Map();

/* deprecated
fs.readdir('./commands/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`../commands/${file}`);
    const eventName = file.split('.')[0];
    commands.set(eventName, eventHandler);
  })
});
*/

processCommands("./commands/");

function processCommands(dir) {
  if (dir.includes('\\') && !dir.endsWith('\\'))
    dir += '\\';
  else if (!dir.endsWith('/'))
    dir += '/';
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      if (fs.statSync(dir + file).isDirectory()) {
        processCommands(dir + file);
      }
      else {
        const eventHandler = require('.' + dir + file);
        const eventName = file.split('.')[0];
        commands.set(eventName, eventHandler);
      }
    })
  });
}


module.exports = (client, message) => {

  console.log('Member: ' + message.author.username);

  if (message.author.bot) return;

  // Just ping-pong
  if (message.content === 'ping') {
    return message.reply(`pong`)
  }

  let commandName = message.content.split(' ')[0];
  let prefix = process.env.prefix;

  if (commandName.startsWith(prefix)) {
    commandName = commandName.substring(prefix.length);
    if (commands.has(commandName)){
      let command = commands.get(commandName);
      return command(message);
    }
  }
}
