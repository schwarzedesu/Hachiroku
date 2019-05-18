const {queue} = require('../../hachiroku');

module.exports = message => {
  const serverQueue = queue.get(message.guild.id);

  if(!serverQueue) return message.channel
    .send(`No songs playing currently`);

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}
