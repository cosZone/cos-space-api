import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/services/prisma/prisma.service';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  providers: [PostService, PrismaService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
