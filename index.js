const { Client, Collection } = require("discord.js");
const client = new Client({
    intents: 32767,
});
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Bot Status: Online')
});
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.snipes = new Collection()
client.config = require("./config.json");
require("./handler")(client);
client.login(process.env.token);
app.listen(3000, () => {
  console.log('[H] | Host: Connected.');
});