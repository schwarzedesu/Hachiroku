module.exports = message => {
  const member = message.mentions.members.first();
  if (!member) {
    return message.reply(`Please mention the user you want to kick.`);
  }
  if (!member.kickable) {
    return message.reply(`I can't kick this user~`);
  }
  return member
    .kick()
    .then(() => message.reply(`${member.user.tag} was kicked.`))
    .catch(error => message.reply(`Sorry, an error occured.`))
}
