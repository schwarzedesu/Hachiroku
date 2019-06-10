const { queue, enumerate } = require('../../hachiroku');
const { RichEmbed } = require('discord.js');

module.exports = message => {
  const embed = new RichEmbed();
  const serverQueue = queue.get(message.guild.id);

  if (!serverQueue) return message.channel
    .send(`The queue is empty`);

  const songs = serverQueue.songs;

  if (songs.length === 1) return message.channel
    .send(`There's only 1 song in queue`);

  shuffle(songs);

  return message.channel
    .send(`:twisted_rightwards_arrows: Shuffled queue~`);

}

// knuth's shuffle
function shuffle(q) {
  let first = q.shift();
  var idx = q.length, aux, rand;

  while (0 !== idx) {
    rand = Math.floor(Math.random() * idx);
    idx -= 1;

    aux = q[idx];
    q[idx] = q[rand];
    q[rand] = aux;
  }

  q.splice(0, 0, first);
  return q;
}
