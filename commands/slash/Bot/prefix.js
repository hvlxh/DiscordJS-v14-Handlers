const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'prefix',
    description: 'Prefix command.',
    options: [
        {
            name: 'add',
            description: 'Add a prefix.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'prefix',
                    description: 'Provide a prefix.',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        },
        {
            name: 'remove',
            description: 'Remove a prefix.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'prefix',
                    description: 'Provide a prefix.',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ]
        },
        {
            name: 'list',
            description: 'List out the prefix of your server.',
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    /**
     * 
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     * @param {import('../../../index')} client 
     */
    run: async (client, interaction) => {
        let prefix;
        let prefixes = await client.database.prefix.get(interaction.guild.id);
        if(!prefixes) {
            await client.database.prefix.set(interaction.guild.id, [',']);
            prefixes = await client.database.prefix.get(interaction.guild.id);
        };
        switch(interaction.options.getSubcommand()) {
            case "add":
                prefix = interaction.options.getString('prefix');    

                if(prefixes.includes(prefix)) 
                return await interaction.reply({
                    content: 'This prefix is already saved in database.',
                    ephemeral: true,
                });

                const newPrefix = [...prefixes, prefix];
                await client.database.prefix.set(interaction.guild.id, newPrefix);
                interaction.reply({ 
                    content: 'Done',
                    ephemeral: true,
                })
                break;
            case "remove":
                prefix = interaction.options.getString('prefix');

                if(!prefixes.includes(prefix))
                return await interaction.reply({
                    content: 'This prefix is not exist in the database.',
                    ephemeral: true
                });


                const array = [...prefixes.filter(p => !p.includes(prefix))];
                await client.database.prefix.set(interaction.guild.id, array);
                break;
            case "list":
                await interaction.reply({
                    embeds: [{
                        title: 'Prefix list:',
                        description: prefixes.join('\n')
                    }]
                })
                break;
        };
    },
};