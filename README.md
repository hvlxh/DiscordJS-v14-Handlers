# DiscordJS-v14-Handlers
A setup of discordjs v14 bot.

Features:
- Slash Command Supported
- Prefix Command Supported
- Executes he bot In a Base Class
- Custom Multi Prefixes

**Easy to Read**
```js
module.exports = {
  name: 'name' //command name
  description: 'description' // command description
  aliases: ['aliases'] //command aliases
  permissions: {
    member: [''] // member permissions
    bot: [''] // bot permissions
  }
  run: (client, message, args) => {
    
  },
};
```
