const { SlashCommandBuilder } = require("discord.js");
const { getUserInfo } = require("../database.js");

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
    const userInfo = await getUserInfo(user.id);
    if (userInfo) {
      await interaction.reply({ content: `Name: ${user.username}\nElo: ${userInfo.elo}\nChess.com: ${userInfo.chesscom}\nLichess: ${userInfo.lichess}`, ephemeral: true });
    } else {
      await interaction.reply({ content: "We have no information on this user.", ephemeral: true });
    }
  },
};
