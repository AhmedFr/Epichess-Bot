const { SlashCommandBuilder } = require("discord.js");
const { insertNewUser, getUser } = require("../database.js");

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
    const newUser = {
      id: user.id,
      name: user.username,
      elo: 1000,
      chesscom: "undefined",
      lichess: "undefined"
    }
    insertNewUser(newUser);
    // const userInfo = leaderboard.findOne({id: user.id});
    console.log(newUser);
    await interaction.reply({ content: "Name 999\nChess.com: USERNAME\nLichess: USERNAME", ephemeral: true });
  },
};
