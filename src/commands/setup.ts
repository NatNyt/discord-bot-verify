import discord from 'discord.js'
import { Commands } from '../util/interface'
import Client from '../util/Client'
import { AlreadyExists, Error, NoPermission, Vertify,Setupdone } from '../util/embed';
export const commands : Commands = {
    name: 'setup',
    description: 'เช็ตค่าบอทเตรียมตัวสำหรับยืนยัน⭐',
    commands: new discord.SlashCommandBuilder()
    .setName('setup')
    .setDMPermission(false)
    .setDescription('เช็ตค่าบอทเตรียมตัวสำหรับยืนยัน⭐')
    .addRoleOption((e) =>
      e.setName('add')
        .setRequired(true)
        .setDescription('หลังจากการยื่นยันสำเร็จให้เพิ่ม📒')
    )
    .addChannelOption((e) => 
      e.setName('channel')
      .setDescription('เลือกห้องที่จะให้ยืนยันตัวตน✅')
      .setRequired(true) 
    )
    .addRoleOption((e) =>
      e.setName('remove')
        .setDescription('หลังจากการยื่นยันสำเร็จให้ลบ❌')
    )
    ,
    async execute (client:Client, interaction:discord.Interaction<discord.CacheType>) {
      if(!interaction) return;
      if(!interaction.isChatInputCommand()) return;
      if(!interaction.memberPermissions?.has('Administrator')) return interaction.reply({ ephemeral: true,embeds: [NoPermission]})
      
      const addRole = interaction.options.getRole('add');
      const channel = interaction.options.getChannel('channel');
      const removeRole = interaction.options.getRole('remove');

      const isRemove = (removeRole) ? removeRole.id : null
      const guildID = interaction?.guildId || "";
      if(!channel) return interaction.reply({ ephemeral: true,embeds: [Error]})
      if(!addRole) return interaction.reply({ ephemeral: true, embeds: [Error]})

      if(client.database.guild?.find(guild => guild.guildId === interaction.guildId)) return interaction.reply({embeds: [AlreadyExists]});
      console.log('Starting edit database');
      client.database.guild?.push({
        role: {
          add: addRole.id,
          remove: isRemove
        },
        channel: channel.id,
        guildId: guildID
      })
      console.log('Done editing database')
      console.log('[IMPORTANT] Database has been save every 5 minutes please do not exit')
      console.log('[NOTE] If have been show "database is save" you can exit')

      const confirm = new discord.ButtonBuilder()
			.setCustomId('verify_ps')
			.setLabel('✅Verify')
			.setStyle(discord.ButtonStyle.Primary);
      const cancel = new discord.ButtonBuilder()
      .setCustomId('cancel_ps')
      .setLabel('❌Cancel')
      .setStyle(discord.ButtonStyle.Danger);
      const row = new discord.ActionRowBuilder<discord.ButtonBuilder>()
			.addComponents(confirm)
      .addComponents(cancel)
      ;
      const channelSend = interaction.guild?.channels.cache.get(channel.id)
      if(!channelSend?.isTextBased()) return interaction.reply({embeds: [Error]})
      try {
        await channelSend.send({embeds: [Vertify], components: [row]})
        return interaction.reply({
          ephemeral: true,
          embeds: [Setupdone]
        })
      } catch (error) {
        return interaction.reply({ ephemeral: true, embeds: [Error]})
      }
      
    }
}