const {
  SlashCommandBuilder,
  PermissionsBitField,
  Guild,
  messageLink,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The user you want to check")
        .setRequired(true)
    )
    .setDescription("Set new role"),
  async execute(interaction) {
    const roleName = interaction.options.getString("name");
    if (interaction.guild.roles.cache.some((role) => role.name === roleName)) {
      return interaction.reply(
        `A role with the name ${roleName} already exists on this server.`
      );
    }
    console.log(interaction.guild.roles.members);
    interaction.guild.roles
      .create({
        name: roleName,
        permissions: [
          PermissionsBitField.Flags.ManageMessages,
          PermissionsBitField.Flags.KickMembers,
        ],
      })
      .then(() => interaction.reply(`Created ${roleName} role.`))
      .catch(console.error);
  },
};
