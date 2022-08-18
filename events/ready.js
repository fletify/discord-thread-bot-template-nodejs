const client = require('../index');

client.on('ready', async() => {
  client.user.setActivity('Threads | /help', { type: 'WATCHING' });
  client.user.setStatus('dnd');
});
