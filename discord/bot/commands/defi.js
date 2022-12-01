const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('genere')
        .setDescription('Renvoi un nombre aléatoire entre 1 et x')
        .addIntegerOption(option => option.setName('max').setDescription('Le nombre max')),
    async execute(interaction) {
        const nbMax = interaction.options.getInteger('max');
        let genere = Math.floor(Math.random() * nbMax);

        return interaction.reply('Nombre : ' + genere);
    },
};
