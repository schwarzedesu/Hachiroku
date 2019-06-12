const { queue } = require('../../hachiroku');

module.exports = message => {
  const serverQueue = queue.get(message.guild.id);
  const idx = Number(message.content.split(' ')[1]);

  if (!idx) {
    return message.channel
      .send(`Please use a number to delete that song in queue, ${message.author.username}-sama`);
  } else if (isNaN(idx)) {
    return message.channel
      .send(`Please use a number to delete that song in queue, ${message.author.username}-sama`);
  } else if (idx > serverQueue.songs.length || idx < 1) {
    return message.channel
      .send(`Please insert a number inside the current songs list to delete`);
  }

  serverQueue.songs.splice((idx - 1), 1);
  return message.channel
    .send(`Song #` + idx + ` has been removed from the queue`);

}
