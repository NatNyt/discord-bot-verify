import discord from 'discord.js'
import { Button } from '../util/interface'
import Client from '../util/Client'
import { AlreadyVertify, Error, NoPermission, Vertify, Setupdone, NotAlreadyVertify, DoneCancel, WrongAwsner, RoleCantEdit, DoneVertify } from '../util/embed';
export const button: Button = {
  name: 'answer 1',
  id: ['vertify_ps0', 'vertify_ps1', 'vertify_ps2', 'vertify_ps3'],
  async execute(client: Client, interaction: discord.Interaction<discord.CacheType>) {
    if (!interaction) return;
    if (!interaction.isButton()) return;
    const guildID = interaction?.guildId as string;
    const guildFound = client.database.guild?.find(guild => guild.guildId === guildID)
    if (!guildFound) return interaction?.reply({ embeds: [Error], ephemeral: true });
    if (!interaction.inCachedGuild()) return interaction?.reply({ embeds: [Error], ephemeral: true });
    if (!client.cacheVerify.find(user => user.userID == interaction.user.id)) return interaction?.reply({ embeds: [NotAlreadyVertify], ephemeral: true });

    const roleAdd = interaction.guild?.roles.cache.get(guildFound.guildId as string);
    if (!roleAdd) return interaction?.reply({ embeds: [Error], ephemeral: true });
    const cache = client.cacheVerify.find(user => user.userID == interaction.user.id);
    const customId = interaction?.customId;
    const matchResult = customId.match(/\d+/);
    const numericPart: Number = matchResult ? Number(matchResult[0]) : 0;

    const title = cache?.data.find(e => e?.id === numericPart);
    const emoji = cache?.correct;

    await interaction.deferReply({ ephemeral: true });

    if (title?.emoji === emoji) {
      try {
        const role = interaction?.guild?.roles.cache.get(guildFound.role.add)
        if (!role) return interaction?.editReply({ embeds: [RoleCantEdit] })
        const member = interaction.member;
        await member?.roles?.add(role);
      } catch (error) {
        return interaction?.editReply({ embeds: [RoleCantEdit] })
      }
      if (typeof guildFound.role.remove === "string") {
        try {
          const role = interaction?.guild?.roles.cache.get(guildFound.role.remove)
          if (!role) return interaction?.editReply({ embeds: [RoleCantEdit] })
          const member = interaction.member;
          await member?.roles?.remove(role);
        } catch (error) {
          return interaction?.editReply({ embeds: [RoleCantEdit] })
        }
      }
      const userIndex = client.cacheVerify.findIndex(user => user.userID === interaction.user.id);
      if (userIndex !== -1) {
        client.cacheVerify = client.cacheVerify.filter((_, index) => index !== userIndex);
        return interaction?.editReply({ embeds: [DoneVertify] });
      } else {
        return interaction?.editReply({ embeds: [Error] });
      }
    } else {
      return interaction?.editReply({ embeds: [WrongAwsner] })
    }

  }
}