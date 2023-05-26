import discord, { SlashCommandBuilder } from 'discord.js';
import { CommandHandler, Database } from '../util/interface';

declare module 'discord.js' {
  export interface Client {
    events: string[];
    commands: SlashCommandBuilder[];
    commandHandler: CommandHandler[];
    database: Database
  }
}
