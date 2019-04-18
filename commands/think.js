module.exports = message => {
        const attachment = new Attachment('https://imgur.com/a/8MyMZqa');
        message.channel.send(attachment);
}
