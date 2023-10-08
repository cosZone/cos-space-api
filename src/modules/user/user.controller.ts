import { Body, Controller, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
// import { JwtAuthGuard } from 'path-to-your-jwt-auth-guard'; // 请确保您已经创建了JwtAuthGuard并替换此路径

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('user')
  async createUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  // Add other endpoints as needed (e.g., update, delete, get, etc.)
}
