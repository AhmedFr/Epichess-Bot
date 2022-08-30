require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fd = require("fs");
const { endianness } = require("os");

const client = (Client = { intents: GatewayIntentBits.Guilds });
client.commands = new Collection();

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .fiter((file) => file.endsWith("js"));
}
