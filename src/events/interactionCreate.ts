import discord from 'discord.js';
import Client from '../util/Client';
export default {
  event: 'interactionCreate' as keyof discord.ClientEvents,
  handler: async (client:Client, interaction:discord.Interaction<discord.CacheType>) => {
    if(!interaction) return;
    if(!interaction.isChatInputCommand()) return;
    const commandName = interaction.commandName;
    const command = client.commandHandler.find(e => e.name === commandName);
    if(!command) return interaction.reply(`Can not find command Please try again`)
    console.log(command?.name, 'has been execute')
    command?.execute(client, interaction);
  }  
}
