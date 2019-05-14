const {queue} = require('../hachiroku');

module.exports = message => {
  const serverQueue = queue.get(message.guild.id);

  if (!serverQueue) return message.channel
    .send(`There's no song that I can skip`);

  serverQueue.connection.dispatcher.end();
}
