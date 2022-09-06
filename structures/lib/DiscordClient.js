const { EmbedBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { Message } = require('discord.js');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const Jsoning = require('jsoning');

class DiscordClient extends Client {
    constructor() {
        super({intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates
        ]});
    
        this.slashCommands = new Collection();
        this.prefixCommands = new Collection();
        this.contextCommands = new Collection();
        this.config = require('../../config');
        this.database = {
            prefix: new Jsoning('./database/prefix.json')
        };
    };

    start() {
        ['events', 'slashCommands', 'prefixCommands'].forEach(handler => 
            require(`../handlers/${handler}`)(this)
        );
        
        this.login(this.config.token)
    };

    /**
     * 
     * @param {string} type 
     * @param {CommandInteraction} message_or_interaction 
     * @param {string} title 
     * @param {string} description 
     */
    sendError(type, message_or_interaction, title, description) {
        switch(type) {
            case "interaction":
                message_or_interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(title)
                        .setDescription(description)
                        .setColor('#f25a5a')
                    ],
                    ephemeral: true,
                });
                break;
            case "message":
                message_or_interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(title)
                        .setDescription(description)
                        .setColor('#f25a5a')
                    ],
                }).then((msg) => setTimeout(() => msg.delete()), 10000);
                break;
        }
    }
};

module.exports = DiscordClient;
