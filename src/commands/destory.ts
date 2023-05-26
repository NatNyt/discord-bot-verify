import discord from 'discord.js'
import { Commands } from '../util/interface.js'
import Client from '../util/Client.js'
import { NotAlreadyExists, Error, NoPermission,DoneCancel } from '../util/embed';
export const commands : Commands = {
    name: 'destory',
    description: 'ยกเลิกการยืนยันตัวตน❌',
    commands: new discord.SlashCommandBuilder()
    .setName('destory')
    .setDMPermission(false)
    .setDescription('ยกเลิกการยืนยันตัวตน❌')
    ,
    async execute (client:Client, interaction:discord.Interaction<discord.CacheType>) {
      if(!interaction) return;
      if(!interaction.isChatInputCommand()) return;
      if(!interaction.memberPermissions?.has('Administrator')) return interaction.reply({ ephemeral: true,embeds: [NoPermission]})
      
      const guildID = interaction?.guildId || "";
      if(!client.database.guild?.find(guild => guild.guildId === interaction.guildId)) return interaction.reply({embeds: [NotAlreadyExists]});
      console.log('Starting edit database');
      client.database.guild = client.database.guild?.filter(entry => {
        return entry.guildId !== guildID || entry.role.add !== entry.role.add;
      });
      console.log('Done editing database')
      console.log('[IMPORTANT] Database has been save every 5 minutes please do not exit')
      console.log('[NOTE] If have been show "database is save" you can exit')
        return interaction.reply({
          ephemeral: true,
          embeds: [DoneCancel]
        })
    }
}