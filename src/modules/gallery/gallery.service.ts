// gallery.service.ts
import { PrismaService } from '@/common/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GalleryItem as GalleryItemModel } from '@prisma/client';
import { CreateGalleryItemDto, UpdateGalleryItemDto } from './gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async createGalleryItem(data: CreateGalleryItemDto): Promise<GalleryItemModel> {
    return this.prisma.galleryItem.create({
      data: {
        ...data,
        itemType: data?.itemType ?? 'TAPE',
        org: data?.org
          ? {
              connectOrCreate: {
                where: { name: data.org },
                create: { name: data.org },
              },
            }
          : undefined,
        createdAt: data?.createdAt ? new Date(data.createdAt) : undefined,
      },
    });
  }

  async getAllGalleryItems(): Promise<GalleryItemModel[]> {
    return this.prisma.galleryItem.findMany({
      include: {
        org: true,
      },
    });
  }

  async updateGalleryItem(id: number, data: UpdateGalleryItemDto): Promise<GalleryItemModel> {
    return this.prisma.galleryItem.update({
      where: { id },
      data: {
        ...data,
        org: data?.org
          ? {
              connectOrCreate: {
                where: { name: data.org },
                create: { name: data.org },
              },
            }
          : undefined,
        createdAt: data?.createdAt ? new Date(data.createdAt) : undefined,
      },
    });
  }

  async deleteGalleryItem(id: number): Promise<GalleryItemModel> {
    return this.prisma.galleryItem.delete({
      where: { id },
    });
  }

  async createManyGalleryItems(data: CreateGalleryItemDto[]) {
    // Ensure all organizations exist
    const orgNames = [...new Set(data.map((item) => item?.org).filter((org) => !!org))] as string[];
    await Promise.all(
      orgNames.map((orgName) =>
        this.prisma.organization.upsert({
          where: { name: orgName },
          update: {},
          create: { name: orgName },
        }),
      ),
    );
    const orgs = await this.prisma.organization.findMany({
      where: { name: { in: orgNames } },
    });
    const orgIdMap = new Map(orgs.map((org) => [org.name, org.id]));

    const createData = data.map((item) => ({
      ...item,
      org: undefined,
      itemType: item?.itemType ?? 'TAPE',
      orgId: item.org ? orgIdMap.get(item.org) : null,
      createdAt: item?.createdAt ? new Date(item.createdAt) : undefined,
    }));

    return this.prisma.galleryItem.createMany({
      data: createData,
      skipDuplicates: true, // Optional: skip duplicates
    });
  }

  // Add other methods as needed (e.g., getGalleryItemById, etc.)
}
