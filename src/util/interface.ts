import discord from 'discord.js'
import Client from './Client.js';
export interface Choice {
    type:string;
    name: string;
    description: string;
    id: string;
}
export interface CommandHandler {
    name: string;
    execute: (client:Client, interaction:discord.Interaction) => string | boolean | void;
}
export interface Commands {
    name: string;
    description: string;
    commands: discord.SlashCommandBuilder | Omit<discord.SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> ;
    execute: (client:Client, interaction:discord.Interaction<discord.CacheType>) => any;
}
export interface GuildData {
    role: {
        add: string;
        remove: string | null;
    }
    channel: string,
    guildId: string | null;
}

export interface Database {
    guild?: GuildData[];
}

export interface ButtonHandler extends CommandHandler {
    id:string;
}

export interface Button {
    name: string;
    id: string | string[];
    execute: (client:Client, interaction:discord.Interaction<discord.CacheType>) => any;
}

export interface DataVertify{
    title: string;
    emoji: string;
}
export interface DataCollection{
    title: string;
    emoji: string;
    id?: number;
}
export interface ActionVertify {
    userID: string;
    correct: string;
    data: DataCollection[]
}