import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user/entities/user.entity';
import { UserController } from 'src/infraestructure/controllers/user/user.controller';
import { AuthMiddleware } from 'src/infraestructure/middlewares/auth/auth.middleware';
import { TokenService } from '../token/token.service';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.SECRET,
        }),
    ],
    providers: [UserService, TokenService],
    controllers: [UserController],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: 'user/signin', method: RequestMethod.GET },
                { path: 'user/signup', method: RequestMethod.POST },
            )
            .forRoutes(UserController);
    }
}
