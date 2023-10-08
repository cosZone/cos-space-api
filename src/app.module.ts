import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './common/configs/config';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true, isGlobal: true, load: [config] }), UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
