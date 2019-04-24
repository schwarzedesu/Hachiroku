const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = message => {

  if (message.member.voiceChannel) {
    message.member.voiceChannel.join()
      .then(connection => {
        message.channel.send(`I have successfully connected to the channel, ${message.author}-sama!`);

        ytdl('http://www.youtube.com/watch?v=A02s8omM_hI')
          .pipe(fs.createWriteStream('video.flv'));

        connection.playArbitraryInput('https://azurlane.koumakan.jp/w/images/0/03/Unicorn_SelfIntroJP.ogg');

      })
      .catch(console.log);
  } else {
    message.channel.send(`You need to join a voice channel first, ${message.author.username}-sama~`);

  }
}
