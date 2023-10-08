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

  async findOrCreateUser(data: CreateUserDto): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({
      where: { clerkUserID: data.clerkUserID },
    });

    if (user) {
      return user;
    }

    return this.createUser(data);
  }
  // Add other methods as needed (e.g., updateUser, deleteUser, getUsers, etc.)
}
