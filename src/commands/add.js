const { SlashCommandBuilder } = require("discord.js");
const { updateUsername } = require("../database.js");

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
    const platform = interaction.options.getString("platform");
    const username = interaction.options.getString("username");
    if (platform != "chesscom" && platform != "lichess") {
      await interaction.reply({ content: `Bad platform given. (chesscom or lichess)`, ephemeral: true });
    } else {
      const message = await updateUsername(interaction.user.id, platform, username);
      await interaction.reply({ content: `${message}`, ephemeral: true });
    }
  },
};
