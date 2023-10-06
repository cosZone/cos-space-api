import { PrismaService } from '@/common/services/prisma/prisma.service';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

// 用户模块
@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
  controllers: [],
})
export class UsersModule {}
