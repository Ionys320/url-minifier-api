import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { UserService } from './user.service';
import { UserBody } from 'src/interfaces/bodies/user.body';
import { random } from 'src/utils/random';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    create(@Body() data: UserBody) {
        const password = random(10);

        return { ...this.userService.create(data.email, password, data.isAdmin), password };
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: UserBody) {
        return this.userService.update(id, data.email, data.isAdmin);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
