const { Message, Client, MessageEmbed } = require("discord.js");
const backup = require("discord-backup");

module.exports = {
    name: "backup",
    aliases: ['back-up'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

      
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: `${client.config.cross} | You're Missing ADMINISTRATOR permissions to perform that action.` });

      const errorEmbed = new MessageEmbed()
      .setTitle('Server Back Up')
      .addField('Back Up Commands', '`backup create` - Create a backup with a key\n`backup load [key]` - Load a backup using the key\n`backup delete [key]` - Delete a backup\n`backup info [key]` - Get information on a backup')
      .setColor('GREEN')
      if(!args[0]) {
        return message.reply({ embeds: [errorEmbed] });
      }

      if(args[0] == "create") {
        try {
        backup.create(message.guild).then((backupData) => {
          message.reply({ content: `${client.config.tick} | Back Up Created!\n🔑 | Back Up Key: \`${backupData.id}\`\n⚠️ | Do not lose the key. It is required to load the backup.`})
        });
        } catch(error) {return};
      }

      if(args[0] == "load") {
        try {
        if(!args[1]) return message.reply({ content: `${client.config.error} | Provide the Back Up Key to Load.` });
        const key = args[1];
        backup.load(key, message.guild).then(() => {
          backup.remove(key);
          message.reply({ content: `${client.config.tick} | Back Up Loaded and the Previous Key is now Invalid. Create a new Backup Key.` });
        });
          } catch(error) {return};
      }

      if(args[0] == "delete" || args[0] == "remove") {
        try {
        if(!args[1]) return message.reply({ content: `${client.config.error} | Provide the Back Up Key to Delete.` });
        const key = args[1];
          backup.remove(key);
          message.reply({ content: `${client.config.tick} | Back Up Deleted!` });
          } catch(error) {return};
      }

      if(args[0] == "info") {
        try {
        if(!args[1]) return message.reply({ content: `${client.config.error} | Provide the Back Up Key to Show.` });
        const key = args[1];
        backup.fetch(key).then((backupInfos) => {
          message.reply({
            embeds: [new MessageEmbed().setTitle('Back Up Information').setDescription(`ID: ${backupInfos.id}\nSize: ${backupInfos.size} KB\nExists: True`)]
          });
        });
        } catch(error) {return};
      }
      
    },
};
