import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsEnum } from 'class-validator';
import { PostStatus } from './post.entity';

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
}
