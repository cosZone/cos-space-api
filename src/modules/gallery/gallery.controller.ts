// gallery.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GalleryItem as GalleryItemModel } from '@prisma/client';
import { CreateGalleryItemDto, UpdateGalleryItemDto } from './gallery.dto';
import { Public } from '@/common/decorator';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Post('add')
  async createGalleryItem(@Body() data: CreateGalleryItemDto): Promise<GalleryItemModel> {
    return this.galleryService.createGalleryItem(data);
  }

  @Post('batch/add')
  async createManyGalleryItems(@Body() data: CreateGalleryItemDto[]) {
    return this.galleryService.createManyGalleryItems(data);
  }

  @Public()
  @Get('public/all')
  async getAllGalleryItems(): Promise<GalleryItemModel[]> {
    return this.galleryService.getAllGalleryItems();
  }

  @Put(':id')
  async updateGalleryItem(@Param('id') id: number, @Body() data: UpdateGalleryItemDto): Promise<GalleryItemModel> {
    return this.galleryService.updateGalleryItem(id, data);
  }

  @Delete(':id')
  async deleteGalleryItem(@Param('id') id: number): Promise<GalleryItemModel> {
    return this.galleryService.deleteGalleryItem(id);
  }

  // Add other endpoints as needed (e.g., get by id, etc.)
}
