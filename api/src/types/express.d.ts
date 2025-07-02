import { Role } from '@prisma/client';
export interface JwtPayload {
  user: {
    id: string;
    username: string;
    role: Role;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
