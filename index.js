const DiscordClient = require('./structures/lib/DiscordClient');
const client = new DiscordClient();

client.start();

module.exports = client;