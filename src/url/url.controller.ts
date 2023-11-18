import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlBody } from 'src/interfaces/bodies/url.body';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('url')
export class UrlController {
    constructor(
        private readonly urlService: UrlService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.urlService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const item = await this.urlService.findOneByMinified(id);
        if (!item) throw new NotFoundException();

        return item;
    }

    @Get('/:id/visit')
    async publicFindOne(@Param('id') id: string) {
        const item = await this.urlService.findOneByMinified(id);
        if (!item) throw new NotFoundException();

        this.urlService.addVisit(item);

        let redirectTo = item.base;
        if (redirectTo.includes('streamrunners.fr')) {
            if (redirectTo.includes('?')) redirectTo += '&';
            else redirectTo += '?';

            redirectTo += `shortenerCode=${item.minified}`;
        }

        return redirectTo;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() data: UrlBody) {
        return this.urlService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() data: UrlBody) {
        return this.urlService.update(id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.urlService.remove(id);
    }
}
