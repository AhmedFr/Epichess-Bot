const fs = require('node:fs');
const path = require('node:path');
const { dbPassword, token } = require("../config.json");
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const Sequelize = require('sequelize');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://epichessStaff:${dbPassword}@cluster0.uxxppvw.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const objTest = {
	name: "Ahmed",
	elo: 1000,
	chesscom: "undefined",
	lichess: "undefined"
}

async function run() {
	try {
	  await dbClient.connect();
	  await dbClient.db("epichess").collection("leaderboard").insertOne(objTest);

	  const database = dbClient.db("epichess");
	  const leaderboard = database.collection("leaderboard");
	  const query = { name: "Ahmed" };
	  const options = {
		projection: { _id: 0, name: 1, elo: 1},
	  };
	  const player = await leaderboard.findOne(query, options);
	  console.log(player.elo);
	} finally {
	  await dbClient.close();
	}
  }
  run().catch(console.dir);

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
	if (!interaction.isChatInputCommand()) return;

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