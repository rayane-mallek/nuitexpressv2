const { ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajouter')
        .setDescription('Permet d\'ajouter une MST'),
    async execute(interaction) {
        const mstList = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Selection')
                    .addOptions(
                        {
                            label: 'VIH',
                            description: 'C\'est le sida',
                            value: 'vih',
                        },
                        {
                            label: 'Syphilis',
                            description: 'Une autre mst',
                            value: 'syphilis',
                        },
                        {
                            label: 'Chlamydia',
                            description: 'Encore une autre mst',
                            value: 'chlamydia',
                        },
                    ),
            );
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Selection d\'une MST)')
            .setDescription('Choisir une mst.');
        return interaction.reply({ephemeral: true, embeds: [embed], components: [mstList] });
    },

};