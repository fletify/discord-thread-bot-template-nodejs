const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  description: "Kick a member from this guild",
  userPermission: ["KICK_MEMBERS"],
  options: [
    {
      name: "member",
      description: "Mention the member to kick",
      type: "USER",
      required: true
    },
    {
      name: "reason",
      description: "The reason for kicking the user",
      type: "STRING",
      required: false
    }
  ],

  run: async (client, interaction) => {


    if (!interaction.guild.me.permissions.has("KICK_MEMBERS")) {
      return interaction.reply({ content: `${client.config.error} | I do not have KICK MEMBERS permissions to perform that action.`, ephemeral: true })
    }

    const target = interaction.options.getMember('member')

    if (target.id === interaction.user.id) {
      return interaction.reply({ content: `${client.config.error} | Mention a valid user. Not yourself.`, ephemeral: true })
    }

    if (target.id === client.user.id) {
      return interaction.reply({ content: `${client.config.error} | Kick me manually.`, ephemeral: true })
    }

    if (interaction.member.roles.highest.comparePositionTo(target.roles.highest) < 1) {
      return interaction.reply({ content: `${client.config.error} | Your highest role's position is lower compared to the mentioned user's highest role. You cannot kick them.` })
    }

    const reason = interaction.options.getString('reason') || "No Reason";

    try {
    let kick = interaction.guild.members.cache.get(target.id)
    kick.kick(reason).catch((e) => {
      interaction.reply({ content: `${client.config.error} | Could not kick the mentioned member. Error: Missing Permissions.` })
    });
    interaction.reply({ content: `${client.config.tick} | **${taget.user.tag}** was Kicked.` });
    target.send({ content: `${client.config.error} | You were kicked from **${interaction.guild.name}** by **${interaction.member.user.tag}** for \`${reason}\`` });
    } catch(error) {
      return interaction.reply({ content: `${client.config.error} | Could not kick the mentioned member. Error: Missing Permissions.`, ephemeral: true })
    }

  }
}