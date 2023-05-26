import discord from 'discord.js';
import Client from "./util/Client";
import fs from 'fs';
import path from 'path';
import config from './util/configReader';

const GatewayIntentBits = discord.IntentsBitField.Flags
const client = new Client({
  intents: [GatewayIntentBits.DirectMessages,GatewayIntentBits.Guilds,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,]
});


console.log('Loading events...');
fs.readdirSync(path.join(__dirname, 'events')).forEach((v, i) => {
  if (v.endsWith('.ts') || v.endsWith('.js')) {
    client.events.push(v);
    console.log('Client events:', v, 'preloading');
  }
});

client.events.forEach(async (v) => {
  console.log('Importing event module:', v);
  const {default:event} = await import('./events/' + v);
  client.on(event.event, (...args) => {
    console.log(event.event.charAt(0).toUpperCase() + event.event.slice(1), 'has been called');
    event.handler(client, ...args);
  });
});



client.login(config.token);
