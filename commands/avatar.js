const { RichEmbed } = require('discord.js');

module.exports = message => {
  const embed = new RichEmbed();
  const member = message.mentions.members.first();

  if (!member) {

    embed.setTitle(`${message.author.tag}'s avatar:`)
      .setColor(0xFFFFFF)
      .setImage(message.author.avatarURL);
    return message.channel.send(embed);
  }

  embed.setTitle(`${member.user.tag}'s avatar:`)
    .setColor(0xFFFFFF)
    .setImage(member.user.avatarURL);

  return message.channel.send(embed);
}
