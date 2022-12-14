require("dotenv").config();
const XMLHttpRequest = require("xhr2");
const fs = require('node:fs');
const {Collection, Client, Events, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let gameVariables = [];
let dataGet = "";

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

    if (interaction.isStringSelectMenu()) {

        const selectedInput = interaction.values[0];
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Selection')
                    .addOptions(
                        {
                            label: 'Preservatif',
                            description: 'Un moyen efficace de se protéger des MST.',
                            value: 'MED;Preservatif',
                        },
                        {
                            label: 'Contraception',
                            description: 'Les moyens de contraception ne protègent pas des MST.',
                            value: 'MED;contraception',
                        },
                        {
                            label: 'Antibiotique',
                            description: 'Les antibiotiques soigent les MST transmises par un virus.',
                            value: 'MED;antibiotique',
                        },
                    ),
            );

        let isMst = selectedInput.split(";");
        if (isMst[0] === 'MST') {
            let selected = isMst[1];
            if (selected === 'vih') {
                const newEmbed = new EmbedBuilder().setTitle('VIH').setDescription('VIH Choisi');
                gameVariables.push(selected);
                await interaction.update({embeds: [newEmbed], components: [row]});
            } else if (selected === 'syphilis') {
                gameVariables.push(selected);
                const newEmbed = new EmbedBuilder().setTitle('Syphilis').setDescription('Syphilis choisi');
                await interaction.update({embeds: [newEmbed], components: [row]});
            } else if (selected === 'Xx_Hepatite_xX') {
                gameVariables.push(selected);
                const newEmbed = new EmbedBuilder().setTitle('Hepatite').setDescription('Hepatite choisi');
                await interaction.update({embeds: [newEmbed], components: [row]});
            }
        } else if (isMst[0] === "MED") {
            let selected = isMst[1];
            if (selected === 'antibiotique') {
                gameVariables.push(selected);
                const newEmbed = new EmbedBuilder()
                    .setTitle('Résumé').setDescription(`Maladie : ${gameVariables[0]}\nMédicament : ${gameVariables[1]}`);
                await interaction.update({embeds: [newEmbed]});
            } else if (selected === 'contraception') {
                gameVariables.push(selected);
                const newEmbed = new EmbedBuilder()
                    .setTitle('Résumé').setDescription(`Maladie : ${gameVariables[0]}\nMédicament : ${gameVariables[1]}`);
                await interaction.update({embeds: [newEmbed]});
            } else if (selected === 'Preservatif') {
                gameVariables.push(selected);
                getHttpRequest();
                const newEmbed = new EmbedBuilder()
                    .setTitle("Résumé").setDescription(`Maladie : ${gameVariables[0]}\nMédicament : ${gameVariables[1]}`);
                await interaction.update({embeds: [newEmbed], components: []});
            }

            simulation(interaction.channel);
        }
    }

    async function simulation(channel) {
        let embed;
        if (Math.floor(Math.random() * 10) >= 5) {
            embed = new EmbedBuilder().setTitle('La MST a remporté la partie !');
        } else {
            embed = new EmbedBuilder().setTitle('Le médicament a remporté la partie !');
        }

        await channel.send({ content: `Résultats`, embeds: [embed] });
    }


    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        const filter = i => i.customId === 'primary' && i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Selection')
                    .addOptions(
                        {
                            label: 'VIH',
                            description: 'C\'est le virus responsable du sida.',
                            value: 'MST;vih',
                        },
                        {
                            label: 'Syphilis',
                            description: 'Une MST transmise par bactérie.',
                            value: 'MST;syphilis',
                        },
                        {
                            label: 'Hepatite',
                            description: 'Une MST transmise par un virus',
                            value: 'MST;Xx_Hepatite_xX',
                        },
                    ),
            );

        collector.on('collect', async i => {
            await i.update({ content: `Lancement de la partie`, components: [row] });
        });

        collector.on('end', collected => {});

        await command.execute(interaction);


    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Il y a une erreur !', ephemeral: true });
    }

});

function getHttpRequest() {
    let queryParameters = "mst=" + gameVariables[0] + "&medic=" + gameVariables[1];
    let url = "https://webinfo.iutmontp.univ-montp2.fr/~nalixt/nuitexpressv2/data.json";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            dataGet = JSON.parse(xhr.responseText);
            //console.log(dataGet);
        }
    }
    xhr.send();
}

class Entite {
    constructor(data) {
        this.name = data.name;
        this.class = 'Entite';
        this.health = data.health;
        this.attack = data.attack;
        this.defense = data.defense;
        this.speed = data.speed;
        this.image = data.image;
        this.isAlive = true;
    }

    getIsAlive() { return this.isAlive; }
    getHealth() { return this.health; }
    getSpeed() { return this.speed; }
    getName() { return this.name; }
    getAttack() { return this.attack; }
    getDefense() { return this.defense; }
    setHealth(health) { this.health = health; }
    setIsAlive(isAlive) { this.isAlive = isAlive; }
}
function startFightDiscord(channel, mst, medic) {
    let MST = new Entite(mst);
    let medicament = new Entite(medic);
    console.log(MST.getHealth());
    while (MST.getIsAlive() && medicament.getIsAlive()) {
        let embedVirus = new EmbedBuilder()
            .setTitle('Simulation')
            .setDescription("Simulation en cours");
        let embedMed = new EmbedBuilder()
            .setTitle('Simulation')
            .setDescription("Simulation en cours");

        channel.send({ embeds: [embedVirus] });
        channel.send({ embeds: [embedMed] });
        if (MST.getSpeed() > medicament.getSpeed()) {
            let damage = MST.getAttack() / medicament.getDefense();
            if (damage < 0) damage = 0;
            MST.setHealth(MST.getHealth() - damage);
            if (MST.getHealth() <= 0) MST.setIsAlive(false);
            damage = medicament.getAttack() / MST.getDefense();
            if (damage < 0) damage = 0;
            medicament.setHealth(medicament.getHealth() - damage);
            if (medicament.getHealth() <= 0) medicament.setIsAlive(false);
        } else {
            let damage = MST.getAttack() / medicament.getDefense();
            if (damage < 0) damage = 0;
            MST.setHealth(MST.getHealth() - damage);
            if (MST.getHealth() <= 0) MST.setIsAlive(false);
            damage = medicament.getAttack() / MST.getDefense();
            if (damage < 0) damage = 0;
            medicament.setHealth(medicament.getHealth() - damage);
            if (medicament.getHealth() <= 0) medicament.setIsAlive(false);
        }
    }
    if (MST.getIsAlive()) {
        return MST.getName();
    } else {
        return medicament.getName();

    }

}


client.login(process.env.BOT_TOKEN);
