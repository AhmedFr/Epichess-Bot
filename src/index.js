const fs = require('node:fs');
const path = require('node:path');
const { token } = require("../config.json");
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const Sequelize = require('sequelize');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('EpiChess is online!');
});

client.on('interactionCreate', async interaction => {
	// if (!interaction.isChatInputCommand()) return;

	if (interaction.isButton() && interaction.customId === "accept") {
		row.components[0].setDisabled(true);
		interaction.reply({content: "A button has been clicked", ephemeral: true});
	}

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
	}
})

client.login(token);