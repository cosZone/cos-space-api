import { Body, Controller, Post } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from './post.dto';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Post('post')
  async createPost(@Body() postData: CreatePostDto): Promise<PostModel> {
    return this.postService.createPost(postData);
  }

  // Add other endpoints as needed (e.g., update, delete, get, etc.)
}
