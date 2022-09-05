module.exports = {
    name: 'ready',
    /**
     * 
     * @param {import('../../structures/lib/DiscordClient')} client 
     */
    run: (client) => {
        console.log('Client is Ready!');
        client.guilds.cache.forEach(guild => {
            guild.commands.set([]);
            client.slashCommands.forEach(cmd => {
                guild.commands.add(cmd).then(() => console.log(`"${cmd.name}" Slash command loaded. Guild: ${guild.id}`));
            });  
            client.contextCommands.forEach(cmd => {
                guild.commands.add(cmd).then(() => console.log(`"${cmd.name}" Context command loaded. Guild: ${guild.id}`));
            });
        });

        client.user.setPresence(client.config.presence);
    },
};
