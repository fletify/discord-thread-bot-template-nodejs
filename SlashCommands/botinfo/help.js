const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require('quick.db');
const { pagination } = require('reconlx');

module.exports = {
  name: "help",
  description: "Use the text command instead",
  type: 'CHAT_INPUT',
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
   const prefix = db.get(`prefix_${interaction.guildId}`) || ">";
    
   interaction.reply({
     content: `Please use the \`${prefix}help\` text command instead.`,
     ephemeral: true
   }) 
    
  },
};
