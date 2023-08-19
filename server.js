require("dotenv").config(); //initialize dotenv
const cron = require("node-cron");
const CLIENT_TOKEN = process.env.CLIENT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const DEADLINE = "2023-09-08T00:00:00+03:00";
const CRON = "*/1 * * * *"; // Her 1 dakikada bir calisir
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const deadline = new Date(DEADLINE);

client.on("ready", () => {
  console.log(`${client.user.tag} olarak giris yapildi.`);
});

cron.schedule(CRON, () => {
  const channel = client.channels.cache.get(CHANNEL_ID);
  const now = new Date();
  const diff = deadline - now;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  const text = `Demo gunune **${days}** gun, **${hours}** saat, **${minutes}** dakika, **${seconds}** saniye kaldi!`;
  channel.send(text);
});

client.login(CLIENT_TOKEN);
