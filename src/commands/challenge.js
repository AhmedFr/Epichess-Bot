const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

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
      oponent.send({content: `Hey ! ${interaction.user} invited you to play a ranked game.
      To accept the game type \`/accept @${interaction.user.username}\` in https://discord.com/channels/976426180230119464/1012463500632801330
      Here is the game link:`, components:[row]});
    } else {
      oponent.send({content: `Hey ! ${interaction.user} invited you to play a ranked game.
      To accept the game type \`/accept @${interaction.user.username}\` in https://discord.com/channels/976426180230119464/1012463500632801330`});
    }
    await interaction.reply({content: `Challenge sent!`, ephemeral: true});
  },
};
