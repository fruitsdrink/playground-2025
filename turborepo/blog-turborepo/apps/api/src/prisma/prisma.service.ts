import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  onApplicationShutdown(signal?: string) {
    this.$disconnect();
    if (signal) {
      console.log(`Received signal: ${signal}`);
    }
  }
  async onModuleInit() {
    this.$connect();
  }
}
