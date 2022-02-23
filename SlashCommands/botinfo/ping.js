const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns client's latency",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`Websocket Latency: ${client.ws.ping}ms\nResponse Time: ${(Date.now() - interaction.createdTimestamp).toFixed(2)}ms`)
        .setColor(client.config.color)

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    },
};
