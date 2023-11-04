import { SetMetadata } from '@nestjs/common';

export const NOT_ONLY_OWNER_KEY = 'not-only-owner-key';

/**
 * 默认授权为仅本博客作者可以通过，加该装饰器则登录后也可。比如评论操作。
 * @constructor
 */
export const NotOnlyOwner = () => SetMetadata(NOT_ONLY_OWNER_KEY, true);
