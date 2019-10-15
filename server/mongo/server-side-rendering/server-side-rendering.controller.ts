import { Controller, Get, Req, Res, Next, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as path from 'path';
const DIST_FOLDER = path.join(process.cwd(), 'dist');
const html = path.join(DIST_FOLDER, 'browser/index.html');

@Controller('*')
export class ServerSideRenderingController {
    renderCache: {} = {};

    @Get()
    public routesRender(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        if (req.url.startsWith('/api')) {
            next();
        } else {
            return res.sendFile(html);
        }
    }
}
