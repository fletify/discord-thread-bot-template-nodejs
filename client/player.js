const { Player } = require("discord-player");
const Discord = require('discord.js');
const client = require("../index.js");

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
  leaveOnStop: false,
  leaveOnEnd: false,
  leaveOnEmpty: false,
  bufferingTimeout: 0,
  
});

player.on('trackStart', async(queue, track) => {
  const ch = queue.metadata;
  const embed = new Discord.MessageEmbed()
  .setTitle('Now Playing')
  .setDescription(`Track: **${track.title}**\nDuration: **${track.duration}**`)
  .setColor('RANDOM')
  .setThumbnail(track.thumbnail)
  await ch.send({ embeds: [embed] }).then(msg => {
    setTimeout(() => {
      msg.delete();
    }, track.durationMS);
  });
});

/*player.on('channelEmpty', async(queue) => {
  setTimeout(() => {
    queue.destroy();
    queue.metadata.send({ embeds: [new Discord.MessageEmbed().setDescription(`${client.config.error} | Voice Channel Empty. Queue Cleared and Music Disconnected.`) ]});
  }, 1000 * 60 * 3);
});*/

/*
player.on('trackAdd', async(queue, track) => {
  if(queue.tracks.length < 2) return;
  const ch = queue.metadata;
  const embed = new Discord.MessageEmbed()
  .setTitle('Track Queued')
  .setDescription(`Track: **${track.title}**\nDuration: **${track.duration}**\nQueue Position: ${queue.tracks.length + 1}`)
  .setColor('RANDOM')
  .setThumbnail(track.thumbnail)
  const msg = ch.send({ embeds: [embed] });
  setTimeout(() => { msg.delete(); }, track.durationMS);
});
*/

module.exports = player;