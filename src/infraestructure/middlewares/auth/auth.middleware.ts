import { Injectable, NestMiddleware } from '@nestjs/common';
import { TokenService } from 'src/infraestructure/services/token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private secret: string;

    constructor(private tokenService: TokenService) {
        this.secret = process.env.SECRET;
    }

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

        const data = this.tokenService.validateToken(token);

        if (!data) {
            return res.status(401).json({ erro: 'invalid token!' });
        }

        req.body._id = data.id;

        return next();
    }
}
