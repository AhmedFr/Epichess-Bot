const {
    SlashCommandBuilder,
    PermissionsBitField,
    Guild,
    messageLink,
  } = require("discord.js");

  const { result } = require("../database.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("draw")
      .addUserOption((option) =>
        option
          .setName("opponent")
          .setDescription("The user you won against.")
          .setRequired(true)
      )
      .setDescription("To use when after you have won a game."),
    async execute(interaction) {
        const opponent = interaction.options.getUser("opponent");
        await result(interaction.user.id, 0.5);
        interaction.reply({content: `That's a tie !`, ephemeral: true});
        opponent.send(`That's a tie !`);
    },
  };
  