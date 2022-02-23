const player = require("../../client/player");

module.exports = {
    name: "resume",
    description: "Resume a paused queue",
    run: async (client, interaction) => {
      const queue = player.getQueue(interaction.guildId);
      if(!queue?.playing) return interaction.reply({ content: `${client.config.error} | Nothing is playing right now.`, ephemeral: true });
      queue.setPaused(false);
      return interaction.reply({content: `⏯️ | Queue Resumed.`});
    },
};