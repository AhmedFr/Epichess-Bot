const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all the bots commands and their description."),
  async execute(interaction) {
    const user = interaction.options.getUser("oponent");
    await interaction.reply({
      content: `/challenge @PSEUDO (lien du jeu): pour defier un ami à une partie classé.\n/friendly @PSEUDO (lien du jeu): pour defier un ami à une partie sans enjeu.\n/info @PSEUDO: pour afficher l'elo et pseudo chess.com & lichess d'un membre du serveur.\n/add PLATEFORME PSEUDO: pour ajouter le pseudo que vous utiliser pour X plateforme (PLATEFORME  étant chesscom  ou lichess).`,
      ephemeral: true,
    });
  },
};
