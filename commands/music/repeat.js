const { queue, enumerate } = require('../../hachiroku');
var repeat = 0;

module.exports = message => {
  const serverQueue = queue.get(message.guild.id);
  const args = message.content.split(' ');

  if (args[1] === 'on') {
    repeat = 2;
    message.channel.send(':repeat: Repeating queue~');
  }
  if (args[1] === '1') {
    repeat = 1;
    message.channel.send(':repeat_one: Repeating first song in queue~');
  }
  if (args[1] === 'off') {
    repeat = 0;
    message.channel.send(':arrow_heading_down: Repeating disabled');
  }
  module.exports = { repeat }
}
