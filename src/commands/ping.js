const { SlashCommandBuilder, CommandInteractionOptionResolver } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Challenge a friend")
    .addUserOption((option) =>
      option
        .setName("oponent")
        .setDescription("The user you want to challenge.")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('oponent'); 
    await interaction.reply(`You want to challenge ${user}`);
  },
};
