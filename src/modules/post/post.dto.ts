import { PostStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsEnum, ValidateNested, IsDateString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  coverUrl?: string;

  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  authorId: number;

  @IsDateString()
  @IsOptional()
  createdAt?: string;
}

export class CreatePostsDto {
  @ValidateNested({ each: true })
  @Type(() => CreatePostDto)
  posts: CreatePostDto[];
}

export class PaginationDto {
  @IsInt()
  @IsOptional()
  page?: number;

  // size
  @IsInt()
  @IsOptional()
  size?: number;
}
