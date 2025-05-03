import { Injectable } from '@nestjs/common';
import { readdir, readFile } from 'fs/promises';
import _ from 'lodash';
import path from 'path';

@Injectable()
export class AppService {
  async getRandomImage() {
    const files = await readdir(path.resolve(__dirname, '..', 'wallpaper'));
    const index = _.random(files.length - 1);
    const randomFile = path.resolve(__dirname, '../wallpaper', files[index]);

    const file = await readFile(randomFile);
    return file;
  }
}
