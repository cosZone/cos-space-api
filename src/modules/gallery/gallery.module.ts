import { PrismaService } from '@/common/services/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';

@Module({
  providers: [GalleryService, PrismaService],
  exports: [GalleryService],
  controllers: [GalleryController],
})
export class GalleryModule {}
