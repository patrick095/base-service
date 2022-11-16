import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './infraestructure/services/user/user.module';

@Module({
    imports: [ConfigModule.forRoot(), UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
