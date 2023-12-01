import { NestFactory }   from '@nestjs/core';
import { AppModule }     from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


let PORT: number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const configService = app.get(ConfigService);
  PORT = configService.get('app.port');
  
  const config = new DocumentBuilder()
    .setTitle('Metabudget API')
    .setDescription('Описание API metabudget')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

bootstrap()
  .then( () => {
    console.log(`Application start on ${PORT} port`);
  })
  .catch((error) => console.error(`Error call Bootstrap(): ${error}`));