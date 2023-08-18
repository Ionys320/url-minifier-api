import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;

  await app.listen(port);

  Logger.log(`URL minifier api on port ${port}`, 'Bootstrap');
}
bootstrap();
