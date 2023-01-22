import { Injectable } from '@nestjs/common';
import { ObjectID } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { TokenInterface } from 'src/domain/user/interfaces/token.interface';

@Injectable()
export class TokenService {
    private secret: string;

    constructor(private jwt: JwtService) {
        this.secret = process.env.SECRET;
    }

    public generateToken(id: ObjectID, expires = 3600): TokenInterface {
        const token: TokenInterface = {
            accessToken: this.jwt.sign(
                { id },
                { expiresIn: expires, secret: this.secret },
            ),
            refreshToken: this.jwt.sign(
                { id },
                { expiresIn: 60 * 60 * 24 * 30, secret: this.secret },
            ),
            tokenType: 'Bearer',
        };
        return token;
    }

    public validateToken(token: string) {
        const data = this.jwt.verify(token, { secret: this.secret });

        if (data) return data;

        return null;
    }
}
