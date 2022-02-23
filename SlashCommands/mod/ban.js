const { MessageEmbed, Client, CommandInteraction } = require('discord.js');

module.exports = {
  name: "ban",
  description: 'Guild ban manager',
  options: [{
    name: 'add',
    description: "Ban an user from this guild",
    type: "SUB_COMMAND",
    userPermissions: ["BAN_MEMBERS"],
    permissions: ["BAN_MEMBERS"],
    options: [{
      name: 'member',
      description: "Mention the user to ban",
      type: "USER",
      required: true
    }, {
      name: 'reason',
      description: "Reason for the ban",
      type: "STRING",
      required: false
    }]
  },
  {
    name: 'remove',
    description: "Unban / Remove a ban of this guild",
    type: "SUB_COMMAND",
    options: [{
      name: 'member_id',
      type: "STRING",
      description: "The ID of the Member to Unban",
      required: true
    }]
  }],

  /*
  * @param {Client} client
  * @param {CommandInteraction} interaction
  * @param {String[]} args
  */

  run: async (client, interaction, args) => {

    if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) return interaction.reply({ content: `${client.config.cross} | I do no have BAN MEMBERS permissions to perform that action.`, ephemeral: true })
    if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({ content: `${client.config.cross} | You're Missing BAN MEMBERS permissions to perform that action.`, ephemeral: true });

    const [subcmd] = args;

    if (subcmd === "add") {
      const user = interaction.options.getUser('member');

      const member = interaction.guild.members.cache.get(user.id)
      const reason = interaction.options.getString('reason') || "None";

      if (interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({ content: `${client.config.cross} | The mentioned member has a role higher than your highest role.`, ephemeral: true });

      try {
        member.send(`${cleint.config.cross} | You were banned from **${interaction.guild.name}** for \`${reason}\` by **${interaction.member.user.tag}**`)
      } catch (err) {
        interaction.channel.send(`${client.config.cross} | The DM could not reach the banned user. Most likely because their DMs are turned off or I do not share a mutual guild with them.`)
      }
      try {
        interaction.guild.members.ban(member, { reason: reason })
        interaction.reply({ content: `${client.config.tick} | **${member.user.tag}** was Banned.` })
      } catch (err) {
        interaction.reply({ content: `${client.config.cross} | Could not ban the user. Error: Missing Permissions.` });
      }

    }

    if (subcmd === "remove") {
      const userID = interaction.options.getString('member_id')

      const bannedUsers = await interaction.guild.bans.fetch();

      const userToUnban = bannedUsers.get(userID).user;
      if (!userToUnban) return interaction.reply({ content: `${client.config.cross} | No such user exists.` })

      try {
        await interaction.guild.members.unban(userToUnban);
        interaction.reply({ content: `${client.config.tick} | **${userToUnban.tag}** was Unbanned.` })
      } catch (error) {
        interaction.reply({ content: `${client.config.cross} | Error: Missing Permissions.` })
      }
    }
  }
}