import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './common/configs/config';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true, isGlobal: true, load: [config] }), PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
