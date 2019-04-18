module.exports = message => {
  const member = message.mentions.members.first();
  console.log(member)
  if (!member) {
    return message.reply(message.author.avatarURL);
  }

  return message.reply(member.user.avatarURL);
}
