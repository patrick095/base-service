import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @MaxLength(16)
    oldPass: string;

    @IsNotEmpty()
    @MaxLength(16)
    newPass: string;
}
