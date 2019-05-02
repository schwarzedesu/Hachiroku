const fs = require('fs');
const ytdl = require('ytdl-core');
var ffmpeg = require('ffmpeg');

module.exports = message => {

  if (message.member.voiceChannel) {
    message.member.voiceChannel.join()
      .then(connection => {
        message.channel.send(`Connected, ${message.author}-sama!`);

        ytdl('http://www.youtube.com/watch?v=A02s8omM_hI')
          .pipe(fs.createWriteStream('video.flv'));

        try {
        	var process = new ffmpeg('video.flv');
        	process.then(function (video) {
            //Callback mode
            video.fnExtractSoundToMP3('video.flv', function (error, file) {
              if(!error){
                console.log('Audio file:' + file);
              }
              console.log(error);
            });
        	}, function (err) {
        		console.log('Error: ' + err);
        	});
        } catch (e) {
        	console.log(e);
        }

        connection.playArbitraryInput('https://azurlane.koumakan.jp/w/images/0/03/Unicorn_SelfIntroJP.ogg');
      })
      .catch(console.log);
  } else {
    message.channel.send(`You need to join a voice channel first, ${message.author.username}-sama~`);

  }
}
