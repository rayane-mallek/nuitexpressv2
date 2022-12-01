require("dotenv").config();
const fs = require('node:fs');
const {Collection, Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Erreur', ephemeral: true });
    }
});



client.login(process.env.BOT_TOKEN);

//
// client.on(Events.MessageCreate, message => {
//     let contenu = message.content;
//     if (contenu === '!test' || contenu === 'test') {
//         message.channel.send({
//             embeds: [{
//                 title: "exemple",
//                 description:"exemple",
//             }]
//         });
//     }
// });