import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'is-public';

/**
 * 声明是否为公开接口
 * 用来跳过 jwt 校验
 * 可作用于 class 或 function
 * @constructor
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
