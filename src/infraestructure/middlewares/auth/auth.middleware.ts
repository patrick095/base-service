import { Injectable, NestMiddleware } from '@nestjs/common';
import {
    IncompleteTokenException,
    InvalidTokenException,
    MalformedTokenException,
    TokenNotFoundException,
} from 'src/infraestructure/exceptions/token-exceptions';
import { TokenService } from 'src/infraestructure/services/token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private tokenService: TokenService) {}

    public use(req: any, res: any, next: () => void) {
        const authHeader = req.headers.authorization as string;
        if (!authHeader) {
            throw new TokenNotFoundException();
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2) {
            throw new IncompleteTokenException();
        }
        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            throw new MalformedTokenException();
        }

        const dataToken = this.tokenService.validateToken(token);

        if (!dataToken) {
            throw new InvalidTokenException();
        }

        if (req.body._id) {
            req.body._id = dataToken.id;
        } else if (req.body.user._id) {
            req.body.user._id = dataToken.id;
        }

        return next();
    }
}
