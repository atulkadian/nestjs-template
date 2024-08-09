import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpAddressMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  use(req: Request, res: Response, next: NextFunction) {
    const ip =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    req['ip-address'] = Array.isArray(ip) ? ip[0] : ip;

    next();
  }
}
