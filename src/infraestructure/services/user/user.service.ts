import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/domain/user/entities/user.entity';
import {
    findUserInterface,
    userInterface,
} from 'src/domain/user/interfaces/uset.interface';
import {
    UserInvalidException,
    UserNotFoundException,
    UserNotUpdatedException,
    UserRegisteredException,
} from 'src/infraestructure/exceptions/user-exceptions';

@Injectable()
export class UserService {
    private salts: number;
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
        this.salts = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    }

    async findById(id: any): Promise<User> {
        return await this.usersRepository.findOneBy(id);
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
        const isPasswordValid = await this.validatePassword(password, user);
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
        user.password = await bcrypt.hash(user.password, this.salts);
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
        const isValid = user._id == userOld._id && user.email === userOld.email;

        if (isValid) {
            const { _id, email, username, password, ...update } = user;

            const updated = await this.usersRepository.update(user._id, update);
            return updated.affected > 0;
        }

        throw new UserInvalidException();
    }

    async updatePassword(
        id: string,
        oldPass: string,
        newPass: string,
    ): Promise<boolean> {
        const user = await this.findById(id);
        const isPasswordValid = await this.validatePassword(oldPass, user);

        if (isPasswordValid) {
            const newPassword = await bcrypt.hash(newPass, this.salts);
            const updated = await this.usersRepository.update(user._id, {
                password: newPassword,
            });
            return updated.affected > 0;
        }

        throw new UserInvalidException();
    }

    private async validatePassword(password: string, user: User) {
        return await bcrypt.compare(password, user.password);
    }
}
