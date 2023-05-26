import yaml from 'yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataVertify } from './interface.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataList: string[] = fs.readdirSync(path.join(__dirname, '..', 'data'));
const list: DataVertify[] = [];

for (let i = 0; i < dataList.length; i++) {
    const element = dataList[i];
    const dataRaw = fs.readFileSync(path.join(__dirname, '..', 'data', element), {encoding: 'utf8'});
    console.log('Reading data from' + element);
    const data:DataVertify[] = JSON.parse(dataRaw);
    for (let i = 0; i < data.length; i++) {
        const result = data[i];
        list.push(result);
    }
}

console.log('Reading all data done')

export default list;