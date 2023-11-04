import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './common/configs/config';
import { HttpExceptionFilter } from './common/filters';
import { AuthGuard } from './common/guards/auth.guard';
import { TransformInterceptor } from './common/interceptors';
import { GalleryModule } from './modules/gallery/gallery.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true, isGlobal: true, load: [config] }), UserModule, PostModule, GalleryModule],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    { provide: APP_GUARD, useClass: AuthGuard },
    AppService,
  ],
})
export class AppModule {}
