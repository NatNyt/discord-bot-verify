import discord from 'discord.js'
import { Button, DataCollection, DataVertify } from '../util/interface.js'
import Client from '../util/Client.js'
import { AlreadyExists, Error, NoPermission, Vertify,AlreadyVertify } from '../util/embed.js';
import shuffleArray from '../util/shuffle.js';
export const button : Button = {
    name: 'vertify',
    id: 'verify_ps',
    async execute (client:Client, interaction:discord.Interaction<discord.CacheType>) {
      if(!interaction) return;
      if(!interaction.isButton()) return;
      const guildID = interaction?.guildId as string;
      const guildFound = client.database.guild?.find(guild => guild.guildId === guildID)
      if(!guildFound) return interaction?.reply({embeds: [Error], ephemeral: true});
      const roleAdd = interaction?.guild?.roles?.cache.get(guildFound.role.add);
      if(!roleAdd) return interaction?.reply({embeds: [Error], ephemeral: true});
      if(client.cacheVerify.find(user => user.userID == interaction.user.id)) return interaction?.reply({embeds: [AlreadyVertify], ephemeral: true});
      const shuffleChoice:DataVertify[] = shuffleArray(client.dataEmoji);
      const choice: DataVertify[] = [];
      for (let i = 0; i < 4; i++) {
        const data: DataCollection = {
          ...shuffleChoice[i],
          id: i
        }
        choice.push(data);
      }
      const row = new discord.ActionRowBuilder<discord.ButtonBuilder>()
      for (let i = 0; i < choice.length; i++) {
        const v = choice[i]
        const button = new discord.ButtonBuilder().setCustomId('vertify_ps'+i.toString()).setLabel(v.emoji).setStyle(discord.ButtonStyle.Primary);
        row.addComponents(button);
      }
      const correct = choice[Math.floor(Math.random() * choice.length)];
      const embed = new discord.EmbedBuilder().setTitle('ยืนยันตัวตน ✅').setDescription('โปรดเลือกอิโมจินี้ `' + correct.title + '` เพื่อทำการเข้าสู่เซิฟเวอร์').setColor("#4942E4").setTimestamp(new Date());
      client.cacheVerify.push({
        userID: interaction.user.id,
        correct: correct.emoji,
        data: choice
      })
      return interaction?.reply({embeds: [embed], components: [row],ephemeral:true})
    }
}