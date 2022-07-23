module.exports = {
    name: 'interactionCreate',
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

            command.run(client, interaction);
        };
    },
};