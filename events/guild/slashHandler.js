module.exports = {
    name: 'interactionCreate',
    nick: 'Nick',
    /**
     * 
     * @param {import('discord.js').CommandInteraction} interaction 
     * @param {import('../../index')} client 
     */
    run: (interaction, client) => {
        if(interaction.isChatInputCommand()) {
            const command = client.slashCommands.get(interaction.commandName)

            if(!command)
            return client.sendError(
                'interaction',
                interaction,
                '404 Not Found',
                'This command is not exist in the bot files.',
            );
            
            if(
                cmd.permissions &&
                cmd.permissions.member &&
                cmd.permissions.member.length &&
                !interaction.channel.permissionsFor(interaction.member).has(cmd.permissions.member)
            ) return client.sendError(
                'interaction',
                interaction,
                '403 Missing Permission',
                `You are missing the permissions of the current command, ${cmd.permissions.member.join(', ')}`,
            );
            if(
                cmd.permissions &&
                cmd.permissions.bot &&
                cmd.permissions.bot.length &&
                !interaction.channel.permissionsFor(interaction.guild.me).has(cmd.permissions.bot)
            ) return client.sendError(
                'interaction',
                interaction,
                '403 Bot Missing Permission',
                `You are missing the permissions of the current command, ${cmd.permissions.bot.join(', ')}`,
            );

            command.run(client, interaction);
        };
    },
};
