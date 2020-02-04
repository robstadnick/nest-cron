import { Module, RequestMethod, HttpModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from '../../auth/middleware/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../mongo/models/users/user.model';
// import { DatabaseModule } from '../../databasa/database.module';
// import { userProviders } from './user.provider';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'USER_MODEL', schema: UserSchema },
        ]),
        HttpModule
    ],
    controllers: [UserController],
    providers: [
        UserService,
    ],
    exports: [
        UserService,
    ]
})
export class UserModule {
 
}
