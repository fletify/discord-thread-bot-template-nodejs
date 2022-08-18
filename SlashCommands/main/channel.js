const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: "channel",
  description: "Set the channel for threads",
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'mention',
      type: 'CHANNEL',
      description: 'Mention the channel for threads',
      channelTypes: ['GUILD_TEXT'],
      required: true
    }
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    
    const channel = interaction.options.getChannel('mention');
    if(!channel) return interaction.reply({ content:'Error'});

    db.set(`channel_${interaction.guild.id}`, channel.id);

    interaction.reply({
      content: `${client.config.tick} | Thread Channel is now <#${channel.id}>.`
    });
    
  },
};
