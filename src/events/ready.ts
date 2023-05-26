import discord from 'discord.js';
import Client from '../util/Client';
import fs from 'fs';
import path from 'path';
import config from '../util/configReader'
export default {
  event: 'ready' as keyof discord.ClientEvents,
  handler: async (client:Client) => {
    let isTypeScript = false;
    try {
      require.resolve('ts-node');
      isTypeScript = true;
      console.log('You need complie it for production')
    } catch (error) {}
    client.database = {guild: []}
    console.log(`${client?.user?.username}#${client?.user?.discriminator} is ready`);
    if(!fs.existsSync(path.join(__dirname, '..', 'database', 'data.json'))) {
      console.log('Database file is not exists');
      console.log('Createing database file');
      fs.writeFileSync(path.join(__dirname, '..', 'database', 'data.json'), JSON.stringify(client.database));
      console.log('Warning: PLEASE DO EDIT DATABASE')
    }else{
      console.log('Loading database file');
      const dataRaw = fs.readFileSync(path.join(__dirname, '..', 'database', 'data.json'), {encoding: 'utf8'})
      const data = JSON.parse(dataRaw)
      client.database = data
      console.log('Database loaded successfully')
      console.log('Warning: PLEASE DO EDIT DATABASE')
    }
    setInterval(() => {
      console.log('Starting saving data');
      const data = JSON.stringify(client.database);
      fs.writeFileSync(path.join(__dirname, '..', 'database', 'data.json'), data);
      console.log('Saving data done');
    }, 300000)
    console.log('Starting Initalization Slash Commands');
    client.commands = [];
    client.commandHandler = [];
    client.buttonHandler = [];
    const commandsList: string[] = fs.readdirSync(path.join(__dirname, '..', 'commands'))
    for (let i = 0; i < commandsList.length; i++) {
      const v = commandsList[i];
        if (v.endsWith((isTypeScript)  ? '.ts' : '.js') || v.endsWith('.js')) {
            const module = await import('../commands/' + v);
            client.commands.push(module.commands.commands);
            client.commandHandler.push({
              name: module.commands.name,
              execute: module.commands.execute
            })
            console.log("Commands " + module.commands.name, "has been added");
        }
    }
    const buttonList: string[] = fs.readdirSync(path.join(__dirname, '..', 'buttons'))
    for (let i = 0; i < buttonList.length; i++) {
      const v = buttonList[i];
        if (v.endsWith((isTypeScript)  ? '.ts' : '.js') || v.endsWith('.js')) {
            const module = await import('../buttons/' + v);
            if(typeof module.button.id == 'object') {
              if(module.button.id instanceof Array<string>){
                for (let i = 0; i < module.button.id.length; i++) {
                  const element = module.button.id[i];
                  client.buttonHandler.push({
                    name: module.button.name,
                    execute: module.button.execute,
                    id: element
                  })
                }
              }else{
                console.log('Button event is somethin wrong at:', v)
              }
            }else{
              client.buttonHandler.push({
                name: module.button.name,
                execute: module.button.execute,
                id: module.button.id
              })
            }
            console.log("Buttons " + module.button.name, "has been added");
        }
    }
    console.log("Done initialization")
    console.log("Starting upload commands");
    const rest = new discord.REST().setToken(config.token);
    try {
      console.log(`Started refreshing ${client.commands.length} application (/) commands.`);
      const commands = client.commands.map(command => command.toJSON());
      const data: any = await rest.put(
        discord.Routes.applicationCommands(config.applicationID),
        { body: commands },
      );
      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      console.log('Error while uploading commands')
      console.error(error);
    }
  }
}
