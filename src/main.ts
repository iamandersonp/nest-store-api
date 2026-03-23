import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Store example')
    .setDescription('A store created with NestJs')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'api/json',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
