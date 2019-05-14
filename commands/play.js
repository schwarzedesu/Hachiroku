const ytdl = require('ytdl-core');
const {queue} = require('../hachiroku');

module.exports = async message => {

  const voiceChannel = message.member.voiceChannel;
  const serverQueue = queue.get(message.guild.id);

  const args = message.content.split(' ');

  if (args[1]) {
    if (args[1].startsWith('https://www.youtube.com/watch?v=')) {
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

          } else {
            serverQueue.songs.push(song);
            //console.log(serverQueue.songs);
            return message.channel
              .send(`${song.title} has been added to the queue~`);
          }

        } else {
          message.channel
            .send(`I need permissions to join ${voiceChannel.name}, ${message.author.username}-sama~`);
        }
      } else {
        message.channel
          .send(`You need to join a voice channel first, ${message.author.username}-sama~`);
      }
    } else {
      message.channel
        .send(`Please provide a youtube link, search will be added soon!`);
        //// TODO: Search queries with some youtube search module
    }
  } else {
    message.channel
      .send(`Please put a youtube link or a youtube search, ${message.author.username}-sama~`);
  }
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
      console.log('Song finished');
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', error => {
      console.error(error);
    });
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 6.25);
}
