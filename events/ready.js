const client = require("../index");

client.on("ready", () => {
    console.log(`[^] | ${client.user.tag} Launched at ${new Date().toLocaleTimeString()}`);
    client.user.setPresence({ activities: [{ name: '/help | Slash Commands' }], status: 'idle'});
});
