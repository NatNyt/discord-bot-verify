import discord from 'discord.js';
import Client from '../util/Client';
export default {
  event: 'interactionCreate' as keyof discord.ClientEvents,
  handler: async (client:Client, interaction:discord.Interaction<discord.CacheType>) => {
    if(!interaction) return;
    if(!interaction.isButton()) return;
    const buttonID = interaction.customId;
    const button = client.buttonHandler.find(button => button.id === buttonID);
    if(!button) return interaction.reply(`Can not find command Please try again`)
    console.log(button?.name, 'has been execute')
    button.execute(client, interaction);
  }  
}
