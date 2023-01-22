import { IsNotEmpty, MaxLength } from 'class-validator';

export class refreshTokenDTO {
    @IsNotEmpty()
    token: string;
}
