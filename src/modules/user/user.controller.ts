import { AuthUser } from '@/common/decorator/auth-user.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { IAuthUser } from '@/common/interfaces';
import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('info')
  async getUserInfo(@AuthUser() user: IAuthUser): Promise<UserModel> {
    Logger.debug('getUserInfo user', user);
    const userData = {
      clerkUserID: user?.userId,
      username: user.username,
      email: user.email,
      walletAddress: user.walletAddress,
      avatar: user.avatar,
      createAt: new Date(user.createAt * 1000), // Convert from Unix timestamp to JavaScript Date
      updateAt: new Date(user.updateAt * 1000),
    };

    return this.userService.findOrCreateUser(userData);
  }
  // Add other endpoints as needed (e.g., update, delete, get, etc.)
}
