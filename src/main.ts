import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {json, urlencoded} from 'express';
// import * as rateLimit from 'express-rate-limit';
// import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.useGlobalPipes(new ValidationPipe({ // автоматические проверки параметров в контроллерах
  //   whitelist: true,      // принимать только известные поля в DTO, другие исключаются из request
  //   transform: true }));  // автопреобразование входящих параметров в примитивы
  app.enableCors();
  // app.use(compression());
  // app.use(json({ limit: '10mb' }));
  // app.use(urlencoded({ extended: true, limit: '10mb', parameterLimit: 1000 }));
  // app.use(
  //     rateLimit({
  //         windowMs: 5 * 60 * 1000, // 5 минут
  //         max: 10000               // ограничение 100 запросов для windowMs
  //     }),
  // );
  await app.listen(33000);
}
bootstrap()
  .then( () => {
    console.log(`Application start on ${33000} port`);
  })
  .catch((error) => console.error(`Error call Bootstrap(): ${error}`));