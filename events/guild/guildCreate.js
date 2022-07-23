module.exports = {
    name: 'guildCreate',
    /**
     * 
     * @param {import('discord.js').Guild} guild 
     * @param {import('../../index')} client 
     */
    run: async (guild, client) => {
        client.slashCommands.map(cmd => {
            guild.commands.set([cmd]).then((a) => console.log(`"${a.name}" loaded in Guild: ${guild.id}`));
        });
        await client.database.prefix.set(guild.id, [client.config.default_prefix]);
    },
};