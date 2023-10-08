import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  clerkUserID: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  walletAddress?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @Type(() => Date)
  @IsOptional()
  createAt?: Date;

  @Type(() => Date)
  @IsOptional()
  updateAt?: Date;
}
