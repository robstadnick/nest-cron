import { Controller, Get, Post, Put, Body, Res, HttpStatus, Param, BadRequestException, Delete } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController {

    constructor(
        private _cronService: CronService
    ) {
    }

    @Get()
    public async index(@Res() res) {
        const users = await this._cronService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post()
    public async create(@Body() body, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0)) {
            throw new BadRequestException('Missing information');
            // throw new MessageCodeError('user:create:missingInformation');
        }
        await this._cronService.create(body);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get(':id')
    public async show(@Param('id') id: string, @Res() res) {
        if (!id) { throw new BadRequestException('Missing information'); }
        const user = await this._cronService.findById(id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put(':id')
    public async update(@Body() body, @Param('id') id: string, @Res() res) {
        if (!id) { throw new BadRequestException('Missing information'); }
        await this._cronService.update(id, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @Res() res) {
        if (!id) { throw new BadRequestException('Missing information'); }
        await this._cronService.delete(id);
        return res.status(HttpStatus.OK).send();
    }

    @Get('logs')
    public async getLogs(@Res() res) {
        const users = await this._cronService.findAllLogs();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('logs')
    public async createLog(@Body() body, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0)) {
            throw new BadRequestException('Missing information');
            // throw new MessageCodeError('user:create:missingInformation');
        }
        await this._cronService.createLogs(body);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get('logs/:id')
    public async getLog(@Param('id') id: string, @Res() res) {
        if (!id) { throw new BadRequestException('Missing information'); }
        const user = await this._cronService.findByIdLogs(id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('logs/:id')
    public async updateLog(@Body() body, @Param('id') id: string, @Res() res) {
        if (!id) { throw new BadRequestException('Missing information'); }
        await this._cronService.updateLogs(id, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('logs/:id')
    public async deleteLog(@Param('id') id: string, @Res() res) {
        if (!id) { throw new BadRequestException('Missing information'); }
        await this._cronService.deleteLogs(id);
        return res.status(HttpStatus.OK).send();
    }
}
