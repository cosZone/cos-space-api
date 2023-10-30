import { IS_PUBLIC_KEY } from '@/common/decorator';
import { IAuthUser } from '@/common/interfaces';
import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    // public 接口不需要校验
    if (isPublic) return true;

    const publicKey = this.configService.get<string>('CLERK_PEM_PUBLIC_KEY');
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    Logger.debug('token', token);
    if (!token) {
      throw new UnauthorizedException(['Token expire or not sign in!']);
    }

    let user: IAuthUser;
    try {
      user = await jwt.verify(token, publicKey);
      Logger.debug('JWT User', user);
      req.user = { ...user };
    } catch (error) {
      throw new UnauthorizedException(['Invalid Token']);
    }

    return true;
  }

  // Bearer token
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
