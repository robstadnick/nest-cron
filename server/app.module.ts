import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
// import { MongooseModule } from '@nestjs/mongoose';
import { AngularModule } from './angular.provider'
import { AuthModule } from './auth/auth.module';
import { MongoDatabaseModule } from './mongo/mongo-database.module';
import { CronModule } from './cron/cron.module';
import { AppController } from './app.controller';

const domino = require('domino');
const win = domino.createWindow();

// tslint:disable: no-string-literal
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;
global['CSS'] = undefined;
global['Event'] = undefined;
global['localStorage'] = undefined;
global['getItem'] = undefined;

@Module({
  controllers: [
    AppController
  ],
  imports: [
    MongoDatabaseModule,
    AuthModule,
    CronModule
    // TODO: UNCOMMENT TO VIEW ISSUE
    // AngularModule.asyncAfterLoad() // Contains AngularUniversalModule.forRoot()
  ],
  providers: [
  ]
})
export class ApplicationModule { }
