const { queue, enumerate } = require('../../hachiroku');
const { RichEmbed } = require('discord.js');

module.exports = message => {
  const serverQueue = queue.get(message.guild.id);
  const embed = new RichEmbed();

  if (!serverQueue) return message.channel
    .send(`The queue is empty`);

  titles = ``;

  for (const [idx, q] of enumerate(serverQueue.songs)) {
    titles = titles.concat(`  **` + idx + `.** ` + q.title + `\n`);
  }

  embed.setTitle(`**Songs queue:** \n`)
    .setColor(0xFFFFFF)
    .setDescription(titles);

  console.log(titles);
  message.channel.send(embed);

}
