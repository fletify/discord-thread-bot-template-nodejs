module.exports = {
  name: 'support',
  description: 'Join my support server for help',
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    interaction.reply({
      content: `[Tap on this URL to join my support server](${client.config.supportURL})`
    });
  },
};