import { Injectable } from '@nestjs/common';
import { readdir, readFile } from 'fs/promises';
import _ from 'lodash';
import path from 'path';

@Injectable()
export class AppService {
  private prevFile: string;
  async getRandomImage() {
    const files = await readdir(path.resolve(__dirname, '..', 'wallpaper'));
    const index = _.random(files.length - 1);
    const randomFile = path.resolve(__dirname, '../wallpaper', files[index]);

    const file = await readFile(randomFile);
    return file;
  }

  async getRandomImageUrl(): Promise<string> {
    const files = await readdir(path.resolve(__dirname, '..', 'wallpaper'));
    const index = _.random(files.length - 1);
    if (this.prevFile === files[index]) {
      return await this.getRandomImageUrl();
    }
    this.prevFile = files[index];

    return `http://localhost:3000/wallpaper/${files[index]}`;
  }
}
