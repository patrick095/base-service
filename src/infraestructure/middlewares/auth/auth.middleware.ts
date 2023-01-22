import { Injectable, NestMiddleware } from '@nestjs/common';
import { TokenService } from 'src/infraestructure/services/token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private tokenService: TokenService) {}

    public use(req: any, res: any, next: () => void) {
        const authHeader = req.headers.authorization as string;
        if (!authHeader) {
            return res.status(401).json({ erro: 'token not found!' });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2) {
            return res.status(401).json({ erro: 'incomplete token!' });
        }
        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ erro: 'malformed token!' });
        }

        const dataToken = this.tokenService.validateToken(token);

        if (!dataToken) {
            return res.status(401).json({ erro: 'invalid token!' });
        }

        if (req.body._id) {
            req.body._id = dataToken.id;
        } else if (req.body.user._id) {
            req.body.user._id = dataToken.id;
        }

        return next();
    }
}
