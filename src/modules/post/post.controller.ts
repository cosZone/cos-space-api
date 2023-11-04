import { Body, Controller, Get, Post } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from './post.dto';
import { PostService } from './post.service';
import { Public } from '@/common/decorator';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('add')
  async createPost(@Body() postData: CreatePostDto): Promise<PostModel> {
    return this.postService.createPost(postData);
  }

  @Public()
  @Get('public/all')
  async getAllPosts(): Promise<PostModel[]> {
    return this.postService.getAllPosts();
  }
  // Add other endpoints as needed (e.g., update, delete, get, etc.)
}
