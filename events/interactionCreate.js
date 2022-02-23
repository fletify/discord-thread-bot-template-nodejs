const client = require("../index");

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    //await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.reply({ content: `${client.config.cross} | Error: No such command found in the directory.`, ephemeral: true });
    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options ?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);
    try {
      cmd.run(client, interaction, args);
    } catch (error) { }
  }
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});
