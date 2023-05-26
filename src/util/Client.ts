import discord, { SlashCommandBuilder } from 'discord.js';
import { CommandHandler, Database, ButtonHandler, ActionVertify } from '../util/interface.js';


class Client extends discord.Client {
    public events: string[] = [];
    public commands: SlashCommandBuilder[] = [];
    public commandHandler: CommandHandler[] = [];
    public database: Database = {};
    public buttonHandler: ButtonHandler[] = [];
    public cacheVerify: ActionVertify[] = [];
}

export default Client