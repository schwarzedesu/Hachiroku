module.exports = (client, message) => {
  if (message.content === 'ping') {
    return message.reply(`pong`)
  }
}
