import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import { userInterface } from '../interfaces/uset.interface';

@Entity()
export class User implements userInterface {
    @ObjectIdColumn()
    @Index({ unique: true })
    _id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @Index({ unique: true })
    username: string;

    @Column()
    @Index({ unique: true })
    phone: string;

    @Column()
    password: string;

    @Column()
    @Index({ unique: true })
    email: string;

    $or: Array<any>;
}
