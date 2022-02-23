const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'purge',
  description: "Purge / Delete many messages at one time.",
  userPermission: ["MANAGE_MESSAGES"],
  options: [
    {
      name: 'number',
      description: 'The number of messages to be purged',
      type: "INTEGER",
      required: true
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: `${client.config.error} | I do not have MANAGE MESSAGES permissions to perform that action.`, ephemeral: true })
    const amount = interaction.options.getInteger('number');
    if (amount < 1 || amount > 100) return interaction.reply({ content: `${client.config.error} | I cannot delete/purge messages more than 100 or less than 1. Also the messages should be newer than 14 days.`, ephemeral: true })
    try {
      interaction.channel.bulkDelete(amount, true)
      interaction.reply({ content: `${client.config.tick} | Purged ${amount} message(s).`, ephemeral: true });
      setTimeout(() => {
        try {
          interaction.channel.send({ content: `${client.config.tick} | **${amount}** message(s) were purged by **${interaction.member.user.tag}**` });
        } catch (error) { return; }
      }, 2000);
    } catch (err) {
      interaction.reply({ content: `${client.config.error} | Could not purge the provied amount of messages. Error: Messages older than 14 days.` })
    }
  },
};