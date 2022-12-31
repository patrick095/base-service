import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/domain/user/entities/user.entity';
import {
    findUserInterface,
    userInterface,
} from 'src/domain/user/interfaces/uset.interface';
import {
    UserInvalidException,
    UserNotFoundException,
    UserRegisteredException,
} from 'src/infraestructure/exceptions/user-exceptions';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findById(id: any): Promise<User> {
        return await this.usersRepository.findOneBy({ _id: id });
    }

    async findOne({
        username,
        email,
        password,
    }: findUserInterface): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: {
                $or: [{ username }, { email }],
            },
        });
        if (!user) {
            throw new UserNotFoundException();
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UserInvalidException();
        }
        user.password = undefined;
        user.email = undefined;
        return user;
    }

    async create(user: userInterface): Promise<User> {
        const registered = await this.usersRepository.findOne({
            where: {
                $or: [{ username: user.username }, { email: user.email }],
            },
        });
        if (registered) {
            throw new UserRegisteredException();
        }
        user.password = await bcrypt.hash(
            user.password,
            process.env.BCRYPT_SALT_ROUNDS,
        );
        const savedUser = await this.usersRepository.save(user);
        savedUser.password = undefined;
        savedUser.email = undefined;
        return savedUser;
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async update(user: Partial<userInterface>): Promise<boolean> {
        const userOld = await this.findById(user._id);
        const isValid =
            user._id === userOld._id && user.email === userOld.email;

        if (isValid) {
            const updated = await this.usersRepository.update(user._id, user);
            return updated.affected > 0;
        }

        throw new UserInvalidException();
    }
}
