const client = require('../index');
const { MessageEmbed } = require('discord.js');

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  const i = interaction;

  if (i.customId == "help_info") {
    const embed = new MessageEmbed()
      .setTitle('❔ | Information Commands')
      .setDescription('These commands give you some or the other information.')
      .addField('Text Commands', '`help` - Shows this menu\n')
      .addField('Slash Commands', '`/ping` - Shows client latency\n`/stats`- Shows clients statistics\n`/help` - Shows this menu\n`/invite` - Invite me to your server')
      .setColor(client.config.color)
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }


  if (i.customId == "help_mod") {
    const embed = new MessageEmbed()
      .setTitle('🔨 | Moderation Commands')
      .setDescription('Commands that you need to moderate and manage your server.')
      .addField('Text Commands', 'None')
      .addField('Slash Commands', '`/ban add` - Ban a member\n`/ban remove` - Unban a banned member\n`/kick` - Kick a member\n`/purge` - Clear specific messages\n')
      .setColor(client.config.color)
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }

  if (i.customId == "help_fun") {
    const embed = new MessageEmbed()
      .setTitle('😂 | Fun Commands')
      .setDescription('Some command that you may enjoy using.')
      .addField('Text Commands', 'None')
      .addField('Slash Commands', '`/meme` - Shares a random reddit meme\n')
      .setColor(client.config.color)
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }

  if (i.customId == "help_utility") {
    const embed = new MessageEmbed()
      .setTitle('🔧 | Utility Commands')
      .setDescription('Bunch of useful commands')
      .addField('Text Commands', 'None')
      .addField('Slash Commands', '`/text translate` - Translate text to any language\n`/url shorten` - Shorten an URL using v.gd\n')
      .setColor(client.config.color)
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }

  if (i.customId == "help_automod") {
    const embed = new MessageEmbed()
      .setTitle('🛡️ | Auto Moderation Commands')
      .setDescription('The commands that allows the bot to moderate the server instead of you!')
      .addField('Text Commands', 'None')
      .addField('Slash Commands', '`/filter links` - Prevent users from sharing links\n')
      .setColor(client.config.color)
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }

  if (i.customId == "help_music") {
    const embed = new MessageEmbed()
      .setTitle('🎵 | Music Commands')
      .setDescription('Play music directly into a voice channel')
      .addField('Text Commands', '`play` - Play a song\n`queue` - View song queue list\n`pause` - Pause the current queue\n`resume` - Resume a paused queue.')
      .addField('Slash Commands', '`/play` - Play a song\n`/queue` - View song queue list\n`/pause` - Pause the current queue\n`/resume` - Resume a paused queue.')
      .setColor(client.config.color)
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }


  if (i.customId == "help_backup") {
    const embed = new MessageEmbed()
      .setTitle('📁 | Back Up Commands')
      .setDescription('Save a template of your guild and recover all the channels, roles, messages whenever needed.')
      .addField('Text Commands', '`backup create` - Creates a backup\n`backup load [key]` - Load a backup\n`backup delete [key]` - Delete a backup\n`backup info [key]` - Information on a back up key')
      .addField('Slash Commands', 'None')
      .setColor(client.config.color)
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }



});
