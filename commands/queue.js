const {queue} = require('../hachiroku');

module.exports = message => {
  const serverQueue = queue.get(message.guild.id);

  if (!serverQueue) return message.channel
    .send(`The queue is empty`);

  titles = ``;

  for (const [idx, q] of enumerate(serverQueue.songs)) {
    titles = titles.concat(`  **` + idx + `:** ` + q.title + `\n`);
  }
  console.log(titles);
  message.channel.send(`**Songs queue:** \n` + titles);

}

// This has to go somewhere else lol
function* enumerate(iterable) {
  let idx = 1;

  for (const i of iterable) {
    yield [idx, i];
    idx++;
  }
}
