const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Add your chess.com or lichess username, so others can add you")
    .addStringOption((option) =>
      option
        .setName("platform")
        .setDescription("chesscom or lichess")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("your username")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('oponent'); 
    await interaction.reply(`Adding your username...`);
  },
};
