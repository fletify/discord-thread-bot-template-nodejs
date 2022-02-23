const player = require("../../client/player");

module.exports = {
  name: "queue",
  description: "Shows the music queue",
  run: async (client, interaction) => {
    const queue = player.getQueue(interaction.guildId);
    if (!queue ?.playing) return interaction.reply({content: `${client.config.error} | Nothing is playing right now.`, ephemeral: true});

    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      return `${i + 1}. **${m.title}** - ${m.requestedBy.tag}`;
    });

    return interaction.reply({
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