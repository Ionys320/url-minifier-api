import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    findOneById(id: number) {
        return this.userRepository.findOneBy({ id: id });
    }

    findOne(email: string) {
        return this.userRepository.findOneBy({ email: email });
    }

    findAll() {
        return this.userRepository.find();
    }

    create(email: string, password: string, isAdmin: boolean) {
        const user = new UserEntity();

        user.email = email;
        user.password = hashSync(password, 10);
        user.isAdmin = isAdmin;

        return this.userRepository.save(user);
    }

    update(id: number, email: string, isAdmin: boolean) {
        return this.userRepository.update(id, {
            email: email,
            isAdmin: isAdmin
        });
    }

    async updatePassword(id: number, oldPassword: string, newPassword: string) {
        const user = await this.userRepository.findOneById(id);
        if (!user) throw new NotFoundException();

        if (compareSync(oldPassword, user.password))
            throw new UnauthorizedException();

        this.userRepository.update(id, {
            password: hashSync(newPassword, 10)
        });

        return;
    }

    remove(id: number) {
        return this.userRepository.delete(id);
    }
}
