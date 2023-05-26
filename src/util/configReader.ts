import yaml from 'yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


interface Config {
    token: string;
    applicationID: string
}
const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
const config:Config = yaml.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.yml'), {encoding: 'utf8'}));

export default config