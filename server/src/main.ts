import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  const config = new DocumentBuilder()
    .setTitle('VietEV')
    .setDescription('The VietEV API description')
    .setVersion('1.0')
    .addTag('VietEV')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 8080;
  await app.listen(port);
}
bootstrap();
