import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends HttpException {
    constructor() {
        super('Invalid token!', HttpStatus.UNAUTHORIZED);
    }
}

export class TokenNotFoundException extends HttpException {
    constructor() {
        super('Token not found!', HttpStatus.BAD_REQUEST);
    }
}

export class IncompleteTokenException extends HttpException {
    constructor() {
        super('Incomplete token!', HttpStatus.BAD_REQUEST);
    }
}

export class MalformedTokenException extends HttpException {
    constructor() {
        super('Malformed token!', HttpStatus.BAD_REQUEST);
    }
}
