module.exports = {
    name: 'ready',
    /**
     * 
     * @param {import('../../structures/lib/DiscordClient')} client 
     */
    run: (client) => {
        console.log('Client is Ready!');
        client.guilds.cache.forEach(guild => {
            let array = [];
            client.slashCommands.forEach(cmd => {
                array.push(cmd)                
            });
            guild.commands.set(array).then((a) => console.log(`"${a.name}" loaded in Guild: ${guild.id}`));
        });

        client.user.setPresence(client.config.presence);
    },
};