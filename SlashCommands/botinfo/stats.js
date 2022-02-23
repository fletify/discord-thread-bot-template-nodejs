const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { version } = require('../../package.json');

module.exports = {
    name: "stats",
    description: "Returns client's statistics",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

      const upsince = (Date.now() / 1000 - client.uptime / 1000).toFixed(0);
      const embed = new MessageEmbed()
        .setTitle('Aerect Statistics')
        .setDescription(`Bot Version: v${version}\nWebsocket Latency: ${client.ws.ping}ms\nResponse Time: ${(Date.now() - interaction.createdTimestamp).toFixed(2)}ms\nGuilds: ${client.guilds.cache.size} Guilds\nUsers: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users\nUp Since: <t:${upsince}:R>`)
        .setColor(client.config.color)

      interaction.reply({embeds: [embed]});
    },
};
