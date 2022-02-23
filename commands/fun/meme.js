const { Message, Client } = require("discord.js");
const got = require('got');
const Discord = require('discord.js');

module.exports = {
    name: "meme",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const memeEmbed = new Discord.MessageEmbed();
    got("https://www.reddit.com/r/meme/random/.json").then(response => {
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeURL = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;
      let memeDownvotes = content[0].data.children[0].data.downs;
      let memeNumComments = content[0].data.children[0].data.num_comments;

      memeEmbed.setTitle(`${memeTitle}`);
      memeEmbed.setURL(`${memeURL}`);
      memeEmbed.setImage(memeImage);
      memeEmbed.setColor(client.config.color);
      memeEmbed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

      message.reply({ embeds: [memeEmbed], content: 'Nice One!' });
    });
    },
};
