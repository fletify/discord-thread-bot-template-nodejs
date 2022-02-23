const client = require("../index");
const schema = require("../models/links");
client.on("messageCreate", async(message) => {

if(message.author.bot) return;
if(message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES")) return;  
  schema.findOne({guildID:message.guild.id},async(err,data)=> {if(data){
  if(data.ignore.includes(message.channel.id)) return;
if(data.mode == "ON" || data.mode == "on" || data.mode == "true") {
  const regex = new RegExp('(http|https)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/\S*)?');
      if (!regex.test(message.content)) return;
  if(regex.test(message.content)) {
if(message.deletable) message.delete();
  message.channel.send(`${client.config.error} | ${message.author}, No Links Allowed!`);
  }
}
  }
                                });

});
