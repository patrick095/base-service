import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import { userInterface } from '../interfaces/uset.interface';

@Entity()
export class User implements userInterface {
    @ObjectIdColumn()
    @Index({ unique: true })
    _id: ObjectID;

    @Column()
    fullName: string;

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

    @Column()
    playerId: string;

    $or: Array<any>;
}
