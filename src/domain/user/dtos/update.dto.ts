import { IsNotEmpty, MaxLength } from 'class-validator';
import { ObjectID } from 'typeorm';
import { userInterface } from '../interfaces/uset.interface';

export class UpdateDto implements Partial<userInterface> {
    @IsNotEmpty()
    _id: ObjectID;

    @IsNotEmpty()
    @MaxLength(32)
    firstName: string;

    @IsNotEmpty()
    @MaxLength(32)
    lastName: string;
}
