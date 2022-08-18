const client = require("../index");
const Discord = require('discord.js');

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    //await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return;
    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options ?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);
   if(cmd.permissions) {
          const authorPerms = interaction.channel.permissionsFor(interaction.member);
		if (!authorPerms || !authorPerms.has(cmd.permissions)) {
      const embed = new Discord.MessageEmbed()
      .setDescription(`${client.config.error} | You Are Missing \`${cmd.permissions}\` Permissions to Run This Command!`)
      .setColor(`RED`)
			return interaction.followUp( { embeds: [embed] } );
		}
        }

        if(cmd.botperms) {
          if(!interaction.guild.me.permissionsIn(interaction.channel).has(`${cmd.botperms}`)) {
        const embed = new Discord.MessageEmbed()
      .setDescription(`${client.config.error} | I am Missing \`${cmd.botperms}\` Permissions to Run This Command!`)
      .setColor(`RED`)
			return interaction.followUp( { embeds: [embed] } );
      }
        }

        if(cmd.locked) {
          if(interaction.member.user.id !== client.config.ownerID) {
            const embed = new Discord.MessageEmbed()
          .setDescription(`${client.config.error} | You're Missing BOT OWNER Privileges to Run the Command!`)
          .setColor(`RED`)
            return interaction.followUp( { embeds: [embed] } );
          }
        }

        try {

        cmd.run(client, interaction, args);

        } catch (error) {
          const m = new Discord.MessageEmbed()
          .setColor(`RED`)
          .setDescription(`${client.config.error} | A Sudden Error Occured! If Possible Identify the Error by your Own or Report it!\nError:\n\`\`\`js\n${error}\`\`\``)
          return interaction.followUp({ embeds: [embed]});
        }
}
if(interaction.isButton()) {
  if(interaction.customId.startsWith('thread-')) {
    const threadID = interaction.customId.replace('thread-', '');
    const authorPerms = interaction.channel.permissionsFor(interaction.member);
		if (!authorPerms || !authorPerms.has("MANAGE_THREADS")) return interaction.reply({content: `You do not have enough permissions to manage threads!`})
    if(!client.channels.cache.get(threadID)) return interaction.reply({
      content: 'Invalid Thread',
      ephemeral: true
    });
    interaction.reply({
      content: `${client.config.tick} | Thread Archived`,
      ephemeral: true
    });
    await client.channels.cache.get(threadID).edit({ name: `Archived | ${client.channels.cache.get(threadID).name}`})
    await client.channels.cache.get(threadID).setArchived(true);
    
  }
  if(interaction.customId.startsWith('delete-')) {
    const threadID = interaction.customId.replace('delete-', '');
    const authorPerms = interaction.channel.permissionsFor(interaction.member);
		if (!authorPerms || !authorPerms.has("MANAGE_THREADS")) return interaction.reply({content: `You do not have enough permissions to manage threads!`})
    if(!client.channels.cache.get(threadID)) return interaction.reply({
      content: 'Invalid Thread',
      ephemeral: true
    });
    interaction.deferReply();
    client.channels.cache.get(threadID).delete();
  }
}

  
});
