import { SetMetadata } from '@nestjs/common';

export const IS_RAW_DATA_KEY = 'is-raw-data';

/**
 * 控制返回数据是否通过 Response 包装
 * @constructor
 */
export const RawData = () => SetMetadata(IS_RAW_DATA_KEY, true);
