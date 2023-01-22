import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { userInterface } from '../interfaces/uset.interface';

export class SignupDto implements userInterface {
    @IsNotEmpty()
    @MaxLength(32)
    firstName: string;

    @IsNotEmpty()
    @MaxLength(32)
    lastName: string;

    @IsNotEmpty()
    @MaxLength(16)
    username: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(11)
    phone: string;

    @IsNotEmpty()
    @MaxLength(16)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    email: string;
}
