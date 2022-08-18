const client = require("../index");
const db = require('quick.db');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

client.on('messageCreate', async(message) => {
  if(message.channel.id == await db.get(`channel_${message.guild.id}`)) {
    if(message.channel.type !== 'GUILD_TEXT') return;
    if(message.author.bot) return;
    message.deletable ? message.delete() : false
    const thread = await message.channel.threads.create({
      name: `${message.author.username}'s Thread`,
      autoArchiveDuration: 60,
  	  reason: `Thread for ${message.author.username}.`
    });
    if (thread.joinable) await thread.join();
    thread.members.add(message.author.id);
    thread.send({
      embeds: [
        new MessageEmbed()
        .setTitle(`Welcome to the Thread @${message.author.tag}`)
        .setDescription(message.content||"No Content Found")
        .setColor("RANDOM")
        .setFooter({ text: `ID: ${message.author.id}` })
        .setTimestamp()
      ],
      components: [
        new MessageActionRow()
			  .addComponents(
				  new MessageButton()
					.setCustomId(`thread-${thread.id}`)
					.setLabel('ARCHIVE')
					.setStyle('SECONDARY')
          .setEmoji('🔒')
			  )
        .addComponents(
          new MessageButton()
          .setCustomId(`delete-${thread.id}`)
          .setLabel('DELETE')
          .setStyle('DANGER')
          .setEmoji('🏳️')
        )
      ]
    });
    message.channel.send({
      embeds: [
        new MessageEmbed()
        .setTitle('Need Help?')
        .setDescription('Type your issue in this channel and we will create a support thread for you 🤍')
        .setColor('#7289da')
        .setTimestamp()
      ]
    });
  }
})