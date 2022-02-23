const translate = require('@iamtraction/google-translate');
const { MessageEmbed, Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: 'text',
  description: "Text Manager",
  options: [
    {
      name: 'translate',
      description: "Translate text to any language",
      type: "SUB_COMMAND",
      options: [
        {
          name: 'text',
          description: "Text to translate",
          type: "STRING",
          required: true
        },
        {
          name: 'to',
          description: "Translation language",
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

    if (cmd == "translate") {

      const text = interaction.options.getString('text');
      const to = interaction.options.getString('to');

      if (text.length > 500) return interaction.reply({ content: `${client.config.error} | Text has more than 500 Characters. Shorten it.`, ephemeral: true })
      try {
        translate(text, { to: to }).then(async (res) => {
          const embed = new MessageEmbed()
            .setTitle('Aerect Translation Tool')
            .setDescription(`Detected Language Code: ${res.from.iso}`)
            .addField('Provided Text', `${text}`)
            .addField('Translated Text', `${res.text}`)
            .setColor(client.config.color)
          interaction.reply({ embeds: [embed] })
        })
      } catch (err) {
        interaction.reply({ content: `${client.config.error} | Server responded with status code: 500 (Internal Server Error). Try again in few minutes.`, ephemeral: true });
      }
    }

  },
};