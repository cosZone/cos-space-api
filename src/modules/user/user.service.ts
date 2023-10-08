import { PrismaService } from '@/common/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<UserModel> {
    return this.prisma.user.create({
      data,
    });
  }

  // Add other methods as needed (e.g., updateUser, deleteUser, getUsers, etc.)
}
