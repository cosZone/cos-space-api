import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestConfig } from './common/configs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  await app.listen(process.env.PORT || nestConfig?.port || 3000);
}
bootstrap();
