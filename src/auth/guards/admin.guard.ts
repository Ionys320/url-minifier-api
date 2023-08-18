import { CanActivate, ExecutionContext, Inject, Logger, forwardRef } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

/**
 * Guard to check if the request is coming from an administrator.
 */
export class AdminGuard implements CanActivate {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const user = await this.userService.findOneById(request.user.id);
        if (!user) return false;

        return user.isAdmin;
    }
}
