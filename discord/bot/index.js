require("dotenv").config();
const fs = require('node:fs');
const {Collection, Client, Events, GatewayIntentBits, EmbedBuilder} = require('discord.js');
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



client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }

    const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
        await i.update({ content: 'A button was clicked!', components: [] });
    });

    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
});

// Interact with add MST
// client.on(Events.InteractionCreate, async interaction => {
//     const command = interaction.client.commands.get(interaction.commandName);
//
//     if (!command) {
//         console.error(`No command matching ${interaction.commandName} was found.`);
//         return;
//     }
//
//     try {
//         await command.execute(interaction);
//     } catch (error) {
//         console.error(error);
//         await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//     }
//     // const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//     // let url = "https://webinfo.iutmontp.univ-montp2.fr/~gaidot/nuitexpressv2/data.json";
//     //     let xhr = new XMLHttpRequest();
//     //     xhr.open("GET", url, true);
//     //     xhr.onreadystatechange = function () {
//     //         if (xhr.readyState == 4 && xhr.status == 200) {
//     //             var json = JSON.parse(xhr.responseText);
//     //             console.log(json);
//     //             return json;
//     //         }
//     //     }
//     //     xhr.send();
//         const selected = interaction.values[0];
//         if (selected === 'vih') {
//             const newEmbed = new EmbedBuilder()
//                 .setTitle('VIH')
//                 .setDescription('VIH Choisi');
//             await interaction.update({ embeds: [newEmbed] });
//         } else {
//             const newEmbed = new EmbedBuilder()
//                 .setTitle('Autre')
//                 .setDescription('Autre choisi');
//             await interaction.update({ embeds: [newEmbed] });
//         }
//     });
//
//






//});

client.login(process.env.BOT_TOKEN);
