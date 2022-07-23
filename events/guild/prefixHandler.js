module.exports = {
    name: 'messageCreate',
    nick: 'Prefix',
    /**
     * 
     * @param {import('discord.js').Message} message 
     * @param {import('../../index')} client 
     */
    run: async (message, client) => {
        let prefixes = await client.database.prefix.get(message.guild.id);
        if(!prefixes) {
            const newPrefixes = await client.database.prefix.set(message.guild.id, [client.config.default_prefix]);
            prefixes = newPrefixes;
        };
        let c_prefix;
        if(prefixes.forEach(prefix => {
            if(message.content.startsWith(prefix))
            c_prefix = prefix;
        }));
        console.log(message.content);
        const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
		c_prefix = message.content.match(prefixMention)
			? message.content.match(prefixMention)[0]
			: c_prefix;

        if(message.content.indexOf(c_prefix) !== 0) return;
        const args = message.content.slice(c_prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.prefixCommands.get(command) || client.prefixCommands.find(c => c.aliases && c.aliases.includes(command));

        if(!cmd) return;

        if(
            cmd.permissions &&
            cmd.permissions.member &&
            cmd.permissions.member.length &&
            !message.channel.permissionsFor(message.member).has(cmd.permissions.member)
        ) return client.sendError(
            'message',
            message,
            '403 Missing Permission',
            `You are missing the permissions of the current command, ${cmd.permissions.member.join(', ')}`,
        );

        if(
            cmd.permissions &&
            cmd.permissions.bot &&
            cmd.permissions.bot.length &&
            !message.channel.permissionsFor(message.guild.me).has(cmd.permissions.bot)
        ) return client.sendError(
            'message',
            message,
            '403 Bot Missing Permission',
            `You are missing the permissions of the current command, ${cmd.permissions.bot.join(', ')}`,
        );

        cmd.run(client, message, args)
    },
};