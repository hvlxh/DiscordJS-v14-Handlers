module.exports = {
    name: 'avatar',
    description: 'Shows (someone)\'s Avatar',
    /**
     * 
     * @param {import('../../../structures/lib/DiscordClient')} client 
     * @param {import('discord.js').CommandInteraction} interaction
     */
    run: (client, interaction) => {
        interaction.reply(interaction.member.displayAvatarURL());
    },
};