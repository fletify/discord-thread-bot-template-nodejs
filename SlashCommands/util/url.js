const fetch = require('node-fetch');
const { MessageEmbed, Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: 'url',
  description: "URL Manager",
  options: [
    {
      name: 'shorten',
      description: "Shorten a URL using v.gd",
      type: "SUB_COMMAND",
      options: [
        {
          name: 'url',
          description: "URL to be shortened",
          type: "STRING",
          required: true
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

    if (cmd == "shorten") {

      const url = interaction.options.getString('url');
      try {
       const data = await fetch('https://v.gd/create.php?format=json&url=' + url).then(r => r.json());
console.log(data);
        interaction.reply({ content: `${client.config.tick} | URL Shortened.\n🌐 | Shortened URL: ${data.shorturl}` });
          
      } catch (err) {
        interaction.reply({ content: `${client.config.error} | Server responded with status code: 500 (Internal Server Error). Try again in few minutes.`, ephemeral: true });
      }
    }

  },
};