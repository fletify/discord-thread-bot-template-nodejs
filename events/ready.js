const client = require("../index");

client.on("ready", () =>
    console.log(`[^] | ${client.user.tag} Launched at ${new Date().toLocaleTimeString()}`)
);
