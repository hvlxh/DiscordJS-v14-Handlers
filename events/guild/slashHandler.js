module.exports = {
    name: 'interactionCreate',
    nick: 'Slash',
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
                command.permissions &&
                command.permissions.member &&
                command.permissions.member.length &&
                !interaction.channel.permissionsFor(interaction.member).has(command.permissions.member)
            ) return client.sendError(
                'interaction',
                interaction,
                '403 Missing Permission',
                `You are missing the permissions of the current command, ${command.permissions.member.join(', ')}`,
            );
            if(
                command.permissions &&
                command.permissions.bot &&
                command.permissions.bot.length &&
                !interaction.channel.permissionsFor(interaction.guild.me).has(command.permissions.bot)
            ) return client.sendError(
                'interaction',
                interaction,
                '403 Bot Missing Permission',
                `You are missing the permissions of the current command, ${command.permissions.bot.join(', ')}`,
            );

            command.run(client, interaction);
        };
    },
};
