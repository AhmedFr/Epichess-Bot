const {
    SlashCommandBuilder,
    PermissionsBitField,
    Guild,
    messageLink,
  } = require("discord.js");

  const { result } = require("../database.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("victory")
      .addUserOption((option) =>
        option
          .setName("opponent")
          .setDescription("The user you won against.")
          .setRequired(true)
      )
      .setDescription("To use when after you have won a game."),
    async execute(interaction) {
        const opponent = interaction.options.getUser("opponent");
        await result(interaction.user.id, 1);
        interaction.reply({content: `Congratulations !`, ephemeral: true});
        opponent.send(`You will get ${interaction.user} next time !`);
    },
  };
  