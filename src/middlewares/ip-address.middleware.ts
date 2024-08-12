import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpAddressMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const ip =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    req['ip-address'] = Array.isArray(ip) ? ip[0] : ip;

    next();
  }
}
