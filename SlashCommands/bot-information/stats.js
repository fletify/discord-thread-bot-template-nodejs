const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

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
        const embed = new MessageEmbed()
        .setTitle('Aerect Statistics')
        .setDescription(`Websocket Latency: ${client.ws.ping}ms\nResponse Time: ${(Date.now() - interaction.createdTimestamp).toFixed(2)}ms`)
        .setColor(client.config.color)

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    },
};
