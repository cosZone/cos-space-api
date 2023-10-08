import { map, Observable } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IResponse } from '@/common/interfaces';
import { IS_RAW_DATA_KEY } from '@/common/decorator';

/**
 * 处理响应数据转化
 * 符合 Response 定义
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T> | T> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<IResponse<T> | T> {
    const isRawData = this.reflector.getAllAndOverride<boolean>(IS_RAW_DATA_KEY, [context.getHandler(), context.getClass()]);
    return next.handle().pipe(map((data) => (isRawData ? data : { code: 200, message: 'success', data })));
  }
}
