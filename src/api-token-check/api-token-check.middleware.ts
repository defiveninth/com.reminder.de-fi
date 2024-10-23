import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
