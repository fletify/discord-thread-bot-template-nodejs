const client = require("../index");
const db = require("quick.db");

client.on("messageCreate", async (message) => {
  if(!message.guild) return;
const prefix = db.get(`prefix_${message.guild.id}`) || client.config.prefix;
  
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

  if(!message.channel.permissionsFor(message.guild.me) || !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;

  const [cmd, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases ?.includes(cmd.toLowerCase()));

  if (!command) return;
  try {
    await command.run(client, message, args);
  } catch (error) {
    console.log(error);
    return message.reply(`${client.config.error} | There was an error while parsing the command request. Try again after a few minutes.`);
  }
});