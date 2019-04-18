module.exports = message => {

  if (message.member.voiceChannel) {
    message.member.voiceChannel.join()
      .then(connection => {
        message.reply('I have successfully connected to the channel!');
        //const dispatcher = connection.playFile('Kokoro_Odoru_ori.mp3');

        dispatcher.on('error', e => {
          console.log(e);
        });
      })
      .catch(console.log);
  } else {
    message.reply(`You need to join a voice channel first, ${message.author.username}-sama~`);
    //message.reply(`You need to join a voice channel first~`);
  }
}
