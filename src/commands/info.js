const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to check")
        .setRequired(true)
    )
    .setDescription(
      "Show the elo and chess.com and lichess username of a user."
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    await interaction.reply({ content: "Name 999\nChess.com: USERNAME\nLichess: USERNAME", ephemeral: true });
  },
};
