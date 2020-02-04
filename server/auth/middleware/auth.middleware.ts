import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware, UnauthorizedException, Logger } from '@nestjs/common';
import { UserService } from '../../modules/users/user.service';
// import { ModelUser } from '../../databasa/models/user/user.model';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    logger = new Logger('AuthMiddleware')
    
    constructor(
        private _userService: UserService
    ) { }

    public async use(req, res, next) {
        if (process.env.NODE_ENV === 'development') {
            if (req.headers.apikey === process.env.TEST_APIKEY) {
                return next();
            }
        }
        if (req.headers.authorization && (req.headers.authorization as string)) {
            let token
            token = (req.headers.authorization as string).replace('Bearer access-token-', '');
            if (token.includes('Bearer')) {
                const arr = (req.headers.authorization as string).split(' ')
                token = arr[1]
            }
            if (!token) {
                this.logger.error('There is no authorization token')
                throw new UnauthorizedException('No Access');
            }
            try {
                const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
                const user = await this._userService.findById(decoded._id);
                if (!user) { throw new UnauthorizedException('User Not Found'); }
                req.jwt_user = user;
                return next();
            } catch (error) {
                this.logger.error(error, error.stack)
                throw new UnauthorizedException('Access Rejected', 'No access allowed');
            }
        } else {
            this.logger.error('There is no authorization token')
            throw new UnauthorizedException('No Access');
        }
    }
}