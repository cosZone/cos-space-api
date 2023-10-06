import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsConfig, NestConfig } from './common/configs';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');

  // Enable CORS if it's set to true in the configuration
  if (corsConfig?.enabled) {
    app.enableCors(); // you can pass specific configuration here if needed
  }

  await app.listen(process.env.PORT || nestConfig?.port || 3000);
}
bootstrap();
