const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all the bots commands and their description."),
  async execute(interaction) {
    const user = interaction.options.getUser('oponent'); 
    await interaction.reply({ content: '', ephemeral: true });
  },
};
