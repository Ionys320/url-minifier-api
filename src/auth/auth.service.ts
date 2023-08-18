import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (!user) return null;

        if (!compareSync(pass, user.password)) return null;

        const { password, ...result } = user;
        return result;
    }

    async login(user: UserEntity) {
        const payload = { sub: user.id };
        return {
            token: this.jwtService.sign(payload),
            user: user
        };
    }
}
