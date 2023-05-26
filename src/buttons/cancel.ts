import discord from 'discord.js'
import { Button } from '../util/interface.js'
import Client from '../util/Client.js'
import { AlreadyVertify, Error, NoPermission, Vertify,Setupdone, NotAlreadyVertify, DoneCancel } from '../util/embed';
export const button : Button = {
    name: 'cancel',
    id: 'cancel_ps',
    async execute (client:Client, interaction:discord.Interaction<discord.CacheType>) {
      if(!interaction) return;
      if(!interaction.isButton()) return;
      
      if(!client.cacheVerify.find(user => user.userID == interaction.user.id)) return interaction?.reply({embeds: [NotAlreadyVertify], ephemeral: true});

      const userIndex = client.cacheVerify.findIndex(user => user.userID === interaction.user.id);
      if (userIndex !== -1) {
        client.cacheVerify = client.cacheVerify.filter((_, index) => index !== userIndex);
        return interaction?.reply({embeds: [DoneCancel], ephemeral: true})
      } else {
        return interaction?.reply({embeds: [Error], ephemeral: true})
      }
    }
}