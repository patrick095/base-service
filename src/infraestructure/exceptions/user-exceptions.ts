import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
    constructor() {
        super('User not found!', HttpStatus.NOT_FOUND);
    }
}

export class UserInvalidException extends HttpException {
    constructor() {
        super('Invalid username or password!', HttpStatus.UNAUTHORIZED);
    }
}

export class UserRegisteredException extends HttpException {
    constructor() {
        super('User already exists!', HttpStatus.BAD_REQUEST);
    }
}

export class UserNotRegisteredException extends HttpException {
    constructor() {
        super('Error on register user!', HttpStatus.BAD_REQUEST);
    }
}

export class UserNotUpdatedException extends HttpException {
    constructor() {
        super('Error on update user!', HttpStatus.BAD_REQUEST);
    }
}
