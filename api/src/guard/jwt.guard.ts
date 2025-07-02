import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/express';
import { Request } from 'express';

const secret = process.env.JWT_ACCESS_SECRET || 'access_secret';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers?.authorization as string;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = jwt.verify(token, secret);
      request.user = decoded as JwtPayload;
      return true;
    } catch (error) {
      console.log('guard error:' + (error as Error).message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
