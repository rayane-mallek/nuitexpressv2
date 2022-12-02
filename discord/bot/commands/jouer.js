
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jouer')
        .setDescription('Lancer la partie'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Jouer ')
                    .setStyle(ButtonStyle.Primary),
            );

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Commencer une nouvelle partie')
            .setDescription('Cliquer sur le bouton pour commencer une nouvelle partie.');

        await interaction.reply({ephemeral: true, embeds: [embed], components: [row]});
    }
    };