import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import { NestExpressApplication } from '@nestjs/platform-express';
// import * as path  from 'path'
import * as bodyParser from 'body-parser';
import * as forceSsl from 'force-ssl-heroku';
import * as fileupload from 'express-fileupload';
import * as helmet from 'helmet';

import * as path from 'path';
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

const DIST_FOLDER = path.join(process.cwd(), 'dist');
const DIST_BROWSER_FOLDER = path.join(DIST_FOLDER, 'browser');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  app.useStaticAssets(DIST_BROWSER_FOLDER);
  app.setBaseViewsDir(DIST_BROWSER_FOLDER);
  app.use(forceSsl);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const port = process.env.PORT || '4082';
  app.use(fileupload());
  app.use(helmet());
  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log('Started Server on Port ', port);
}
bootstrap();
