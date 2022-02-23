const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "help",
  description: "The Bot's help menu",
  type: 'CHAT_INPUT',
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const embed = new MessageEmbed()
      .setTitle('Aerect Help Menu')
      .setDescription('I am a multi functional and multi purpose discord bot designed and developed by Aerect Inc.\n\n**NAVIGATION MENU**\n❔ - Information Commands\n😂 - Fun Commands\n🔨 - Moderation Commands\n🔧 - Utility Commands\n🛡️ - Auto Moderation Commands\n🎵 - Music Commands\n📁 - Backup Commands\n')



      .setFooter({ text: 'Aerect Inc.'} )
      .setThumbnail(client.user.displayAvatarURL()).setColor(client.config.color)

    const btn1 = new MessageButton()
      .setEmoji('❔')
      .setStyle('SECONDARY')
      .setCustomId('help_info')

    const btn2 = new MessageButton()
      .setEmoji('😂')
      .setStyle('SECONDARY')
      .setCustomId('help_fun')

    const btn3 = new MessageButton()
      .setEmoji('🔨')
      .setStyle('SECONDARY')
      .setCustomId('help_mod')

    const btn4 = new MessageButton()
      .setEmoji('🔧')
      .setStyle('SECONDARY')
      .setCustomId('help_utility')

    const btn5 = new MessageButton()
      .setEmoji('🛡️')
      .setStyle('SECONDARY')
      .setCustomId('help_automod')

    const btn6 = new MessageButton()
      .setEmoji('🎵')
      .setStyle('SECONDARY')
      .setCustomId('help_music')

    const btn7 = new MessageButton()
      .setEmoji('📁')
      .setStyle('SECONDARY')
      .setCustomId('help_backup')

    const row1 = new MessageActionRow()
      .addComponents(btn1, btn2, btn3, btn4, btn5)
    const row2 = new MessageActionRow()
      .addComponents(btn6, btn7)


    interaction.reply({
      embeds: [embed], components: [row1, row2]
    });
  },
};
