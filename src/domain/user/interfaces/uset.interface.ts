import { ObjectID } from 'typeorm';

export interface userInterface {
    _id?: ObjectID;
    username: string;
    fullName: string;
    password: string;
    email: string;
    phone: string;
}

export interface userSigninInterface {
    username: string;
    password: string;
}

export interface findUserInterface {
    username?: string;
    email?: string;
    password: string;
}
