const fs = require('fs');
const ytdl = require('ytdl-core');
var ffmpeg = require('ffmpeg');

module.exports = async message => {

  const voiceChannel = message.member.voiceChannel;
  const queue = new Map();
  const serverQueue = queue.get(message.guild.id);

  const args = message.content.split(' ');

  if (voiceChannel) {

    const perms = voiceChannel.permissionsFor(message.client.user);

    if (perms.has('CONNECT') && perms.has('SPEAK')) {

      const songInfo = await ytdl.getInfo(args[1]);
      const song = {
       title: songInfo.title,
       url: songInfo.video_url,
      };

      if (!serverQueue) {
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
        };

        queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;

          play(message.guild, queueConstruct.songs[0]);

        } catch (err) {
          console.log('Error trying to join voice channel! \n' + err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }

        function play(guild, song) {
          const serverQueue = queue.get(guild.id);
          if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
          }

          const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
            .on('end', () => {
              console.log('Song finished~');
              serverQueue.songs.shift();
              play(guild, serverQueue.songs[0]);
            })
            .on('error', error => {
              console.error(error);
            });
          dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        }

      } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        return message.channel.send(`${song.title} has been added to the queue~`);
      }

    } else {
      message.channel.send(`I need permissions to join ${voiceChannel.name}, ${message.author.username}-sama~`);
    }
    /*voiceChannel.join()
      .then(connection => {
        //message.channel.send(`Connected, ${message.author}-sama!`);

        ytdl('http://www.youtube.com/watch?v=A02s8omM_hI')
          .pipe(fs.createWriteStream('video.flv'));

        connection.playArbitraryInput('https://azurlane.koumakan.jp/w/images/0/03/Unicorn_SelfIntroJP.ogg');
      })
      .catch(console.log);*/
  } else {
    message.channel.send(`You need to join a voice channel first, ${message.author.username}-sama~`);
  }
}
