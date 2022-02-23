const player = require("../../client/player");

module.exports = {
    name: "pause",
    description: "Pause the current track",
    run: async (client, interaction) => {
      const queue = player.getQueue(interaction.guildId);
      if(!queue?.playing) return interaction.reply({ content: `${client.config.error} | Nothing is playing right now.`, ephemeral: true });
      queue.setPaused(true);
      return interaction.reply({content: `⏸️ | Queue Paused.`});
    },
};