const { Message, Client } = require("discord.js");
const player = require('../../client/player');

module.exports = {
    name: "queue",
    aliases: ['q'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      const queue = player.getQueue(message.guild.id);
    if (!queue ?.playing) return message.reply({content: `${client.config.error} | Nothing is playing right now.`});

    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      return `${i + 1}. **${m.title}** - ${m.requestedBy.tag}`;
    });

    return message.reply({
      embeds: [
        {
          title: `${queue.metadata.name} - Queue`,
          description: `${tracks.join("\n")}${
            queue.tracks.length > tracks.length
              ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length}...` : `${queue.tracks.length - tracks.length}...`}` : ""}`,
          color: "RANDOM",
          footer: { text: `Now Playing: ${currentTrack.title} (${currentTrack.duration})` },
        },
      ],
    });
    },
};
