import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthUser } from '../interfaces';

export const AuthUser = createParamDecorator((data: keyof IAuthUser, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user: IAuthUser = req.user;
  console.log('xxxxxxxxx', req.user);
  return data ? user?.[data] : user;
});
