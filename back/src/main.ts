import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  const config = new DocumentBuilder()
    .setTitle('Novity Slack API')
    .setDescription('Details of Novity Slack API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  writeFile(
    resolve(__dirname, '../../public/swagger.json'),
    JSON.stringify(document),
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
