import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKeyProvider: (_: any, __: any, done: any) => {
                return done(null, process.env.JWT_SECRET_KEY);
            },
        });
    }

    async validate(payload: any) {
        const { sub: userId } = payload;

        const user = await this.userService.findOneById(userId);
        if (!user) throw new UnauthorizedException();

        return { userId };
    }
}