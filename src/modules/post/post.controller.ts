import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto, CreatePostsDto } from './post.dto';
import { PostService } from './post.service';
import { Public } from '@/common/decorator';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('add')
  async createPost(@Body() postData: CreatePostDto): Promise<PostModel> {
    return this.postService.createPost(postData);
  }

  @Post('add/batch')
  async createMultiplePosts(@Body() postsData: CreatePostsDto) {
    return this.postService.createMultiplePosts(postsData.posts);
  }

  @Public()
  @Get('public/all')
  async getAllPosts(): Promise<PostModel[]> {
    return this.postService.getAllPosts();
  }
	
  @Public()
  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<PostModel | null> {
    return this.postService.getPostById(id);
  }
  // Add other endpoints as needed (e.g., update, delete, get, etc.)
}
