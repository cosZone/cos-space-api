import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

/**
 * 处理异常拦截
 * 返回给前端符合 Response 定义, 多加了 path, timestamp字段
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    /**
     * 服务器内部错误
     */
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`${request.url}: ${exception.message}`, exception.stack);
    }

    const exceptionResponse = exception.getResponse() as any;

    // 组装返回给前端的数据
    response.status(status).json({
      code: status,
      path: request.path,
      message: exception.message,
      timestamp: new Date().toISOString(),
      data: exceptionResponse.message ? (typeof exceptionResponse.message === 'string' ? null : exceptionResponse.message) : exceptionResponse,
    });
  }
}
