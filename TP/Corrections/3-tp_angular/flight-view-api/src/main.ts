import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as https from 'https';
import { ExpressAdapter } from '@nestjs/platform-express/adapters/express-adapter';
import * as express from 'express';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(`${process.cwd()}/ssl/server.key`),
    cert: fs.readFileSync(`${process.cwd()}/ssl/server.crt`),
  };

  const server = express();

  const app = await NestFactory.create(AppModule,new ExpressAdapter(server));
  app.enableCors({ preflightContinue: false });
  https.createServer(httpsOptions, server).listen(3000,
    () => {
      // tslint:disable-next-line:no-console
      console.info(`Applistening on port ${3000}! Go to https://localhost:${3000}/`);
    });

  await app.init();
}
bootstrap();
