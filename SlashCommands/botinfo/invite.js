module.exports = {
  name: 'invite',
  description: 'Add me to your own discord server.',
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    interaction.reply({
      content: `[Tap on this URL to invite me to your Discord Server.](${client.config.inviteURL})`
    });
  },
};