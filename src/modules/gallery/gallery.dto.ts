// gallery.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { GalleryType } from '@prisma/client';
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGalleryItemDto {
  // default is TAPE
  @IsEnum(GalleryType)
  itemType: GalleryType;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  cover?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @IsString()
  @IsOptional()
  org?: string; // 添加一个字段来接收 Organization 的名称

  @IsInt()
  @IsOptional()
  createdAt?: number;
}

export class UpdateGalleryItemDto extends PartialType(CreateGalleryItemDto) {}

export class PaginationDto {
  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  size?: number;
}
