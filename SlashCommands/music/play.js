const { QueryType } = require("discord-player");
const player = require("../../client/player");
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "play",
  description: "Play music into the voice channel",
  options: [
    {
      name: "title",
      description: "Title of the Song",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const songTitle = interaction.options.getString("title");

    if (!interaction.member.voice.channel) return interaction.reply({ content: `${client.config.error} | You need to be connected to a voice channel.`, ephemeral: true });

    interaction.reply('🎶 | Searching through my playlists...');
    
    const searchResult = await player.search(songTitle, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    const queue = await player.createQueue(interaction.guild, {
      metadata: interaction.channel,
    });

    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);
    const embed = new MessageEmbed().setDescription(`**${searchResult.tracks[0].title}**`).setColor(client.config.color).setThumbnail(searchResult.tracks[0].thumbnail)
    interaction.editReply({ embeds: [embed], content: `${client.config.tick} | Track Found.` });
    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};


