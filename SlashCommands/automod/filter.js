const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const linkSchema= require("../../models/links");

module.exports = {
  name: 'filter',
  description: "Guild filter manager",
  options: [
    {
      name: 'links',
      description: "Manage links posted into channels",
      type: "SUB_COMMAND",
      options: [
        {
          name: 'mode',
          description: "Enable or disable Links filter.",
          type: "STRING",
          required: true,
          choices: [{
            name: 'ON',
            value: 'ON'
          }, {
            name: 'OFF',
            value: 'OFF'
          }],
        },
        {
          name: 'ignore',
          description: "Ignore users posting links in this channel",
          type: "CHANNEL",
          channelTypes:["GUILD_TEXT"],
required: false
        },
      ]
    },
  ],

  /*
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
  */

  run: async (client, interaction, args) => {

    const [cmd] = args;

    if (cmd == "links") {

      if (!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply({ content: `${client.config.cross} | You're Missing MANAGE GUILD permissions to perform that action.`, ephemeral: true });

      const mode = interaction.options.getString('mode');
      const ignore = interaction.options.getChannel('ignore') || {id: "123456789"};
      
linkSchema.findOne({ guildID: interaction.guildId }, async(err, data) => {
  if(data) {
    data.mode = mode;
    data.ignore = [ignore.id];
    data.save()
} else {
    new linkSchema({
      guildID: interaction.guildId,
      mode: mode,
      ignore: [ignore.id]
    }).save()
      };
});
      interaction.reply({content: `${client.config.tick} | Links Filter is now \`${mode}\``});
    }

  },
};