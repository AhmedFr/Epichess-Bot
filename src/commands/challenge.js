const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("challenge")
    .setDescription("Challenge a friend")
    .addUserOption((option) =>
      option
        .setName("oponent")
        .setDescription("The user you want to challenge.")
        .setRequired(true)
    )
    .addStringOption((option) =>
    option
      .setName("link")
      .setDescription("A link to the game")
  ),
  async execute(interaction) {
    const user = interaction.options.getUser('oponent'); 
    await interaction.reply(`You want to challenge ${user}`);
  },
};
