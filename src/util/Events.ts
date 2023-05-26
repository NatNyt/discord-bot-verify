import Client from "./Client.js";
import discord from 'discord.js';

export default class EventHandler {
  public client: Client | null = null;
  public event: keyof discord.ClientEvents = 'ready';

  constructor(client: Client) {
    this.client = client;
  }

  handler(): void | boolean {}
}
