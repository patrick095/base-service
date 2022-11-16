import { Module } from '@nestjs/common';
import { UserController } from 'src/infraestructure/controllers/user/user.controller';
import { UserService } from './user.service';

@Module({
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
