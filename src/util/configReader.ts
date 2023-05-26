import yaml from 'yaml';
import fs from 'fs';
import path from 'path';

interface Config {
    token: string;
    applicationID: string
}
const config:Config = yaml.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.yml'), {encoding: 'utf8'}));

export default config