import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestConfig } from './common/configs';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');

  await app.listen(process.env.PORT || nestConfig?.port || 3000);
}
bootstrap();
