module.exports = {
    name: 'avatar',
    description: 'Shows (someone)\'s Avatar',
    /**
     * 
     * @param {import('../../../structures/lib/DiscordClient')} client 
     * @param {import('discord.js').Message} message 
     * @param {Array<string>} args 
     */
    run: (client, message, args) => {
        message.reply(message.member.displayAvatarURL());
    },
};