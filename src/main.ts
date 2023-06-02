import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('Back')
    .setVersion('1.0')
    //.addBearerAuth(
    //  {
    //    name: 'Authorization',
    //    bearerFormat: 'JWT',
    //    scheme: 'bearer',
    //    type: 'http',
    //    in: 'Header'
    //  },
    //  'docs-token',
    //)
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document);

  app.use(cors());

  await app.listen(3001);

}
bootstrap();
