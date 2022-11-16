import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './domain/user/entities/user.entity';
import { UserModule } from './infraestructure/services/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: process.env.MONGODB_URI,
            entities: [User],
            useNewUrlParser: true,
            useUnifiedTopology: true,
            database: process.env.MONGODB_NAME,
            logging: true,
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
