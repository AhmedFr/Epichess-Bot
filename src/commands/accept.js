const {
  SlashCommandBuilder,
  PermissionsBitField,
  Guild,
  messageLink,
} = require("discord.js");
const { acceptChallenge } = require("../database.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("accept")
    .addUserOption((option) =>
      option
        .setName("opponent")
        .setDescription("The user who challenged you.")
        .setRequired(true)
    )
    .setDescription("Accept a ranked game."),
  async execute(interaction) {
    const opponent = interaction.options.getUser('opponent');

    opponent.send({content: `${interaction.user} accepted your invitation !
    Once you finish the game don't forget to type \`/victory or /defeat or /draw @${interaction.user.username}\` in https://discord.com/channels/976426180230119464/1012463500632801330`});
    await acceptChallenge(interaction.user.id, opponent.id);
    interaction.reply({content: `You have accepted ${opponent}'s invitation !`});
  },
};
