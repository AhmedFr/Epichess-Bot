const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("friendly")
    .setDescription("Challenge a friend in a friendly match")
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
    const oponent = interaction.options.getUser('oponent');
    const link = interaction.options.getString('link');
    
    if (link != null) {
      const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Game link')
          .setStyle(ButtonStyle.Link)
          .setURL(link)
      );
      oponent.send({content: `Hey ! ${interaction.user} invited you to play a friendly game.\nHere is the game link:`, components:[row]});
    } else {
      oponent.send({content: `Hey ! ${interaction.user} wants to play a friendly game with you.`});
    }

    await interaction.reply({content: `Friendly challenge sent, waiting for ${oponent} to respond...`, ephemeral: true});
  },
};
