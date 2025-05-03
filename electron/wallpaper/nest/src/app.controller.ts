import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getRandomImage(@Res() res: Response) {
    const buffer = await this.appService.getRandomImage();
    return new Promise((resolve) => {
      setTimeout(() => {
        // res.set('Context-Type', 'image/jpeg');
        res.type('image/jpeg');
        resolve(res.send(buffer));
      }, 2000);
    });
  }
}
