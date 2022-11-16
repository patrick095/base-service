import { IsNotEmpty, MaxLength } from 'class-validator';
import { userSigninInterface } from '../interfaces/uset.interface';

export class SigninDto implements userSigninInterface {
    @IsNotEmpty()
    @MaxLength(16)
    username: string;

    @IsNotEmpty()
    @MaxLength(16)
    password: string;
}
