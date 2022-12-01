const { Events, Client, GatewayIntentBits } = require('discord.js');
require("dotenv").config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.login(process.env.BOT_TOKEN);

client.on(Events.MessageCreate, message => {
    let contenu = message.content;
    if (contenu === '!test' || contenu === 'test') {
        message.channel.send({
            embeds: [{
                title: "exemple",
                description:"exemple",
            }]
        });
    }
});