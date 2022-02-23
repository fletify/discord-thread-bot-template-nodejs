const { Message, Client, MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");
const player = require("../../client/player");

module.exports = {
  name: "play",
  aliases: ['p'],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    if(!args[0]) return message.reply({ content: `${client.config.error} | Provide a title / name. For better results provide author name. Example: \`play akon bananza\`` });

    const songTitle = args.join(" ");      
    if (!message.member.voice.channel) return message.reply({ content: `${client.config.error} | You need to be connected to a voice channel.` }); 

    const msg = await message.reply({ content: '🎶 | Searching for the track in my playlists...', fetchReply: true });
    setTimeout(() => { msg.delete(); }, 3000);
    
    const searchResult = await player.search(songTitle, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO,
    });

    const queue = await player.createQueue(message.guild, {
      metadata: message.channel,
    });

    if (!queue.connection) await queue.connect(message.member.voice.channel);
    
    const embed = new MessageEmbed()
      .setTitle('Added to Queue')
      .setDescription(`**${searchResult.tracks[0].title}**`)
      .setColor(client.config.color)
      .setThumbnail(searchResult.tracks[0].thumbnail)
    
    await message.reply({ embeds: [embed] });
    
    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();

  },
};
