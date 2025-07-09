import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

interface JwtPayload {
  userId: string;
  role: string;
}

interface RefreshTokenPayload {
  userId: string;
  role: string;
  jti: string;
}

@Injectable()
export class JwtService {
  constructor(private readonly prisma: PrismaService) {}

  generateAccessToken(payload: Omit<JwtPayload, 'jti'>) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET || 'secret_access_token',
      {
        expiresIn: '15m',
      },
    );
    return accessToken;
  }

  async generateRefreshToken(payload: JwtPayload) {
    const refreshTokenRecord = await this.prisma.token.create({
      data: {
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const refreshToken = jwt.sign(
      { userId: payload.userId, jti: refreshTokenRecord.id },
      process.env.JWT_REFRESH_SECRET || 'secret_refresh_token',
      {
        expiresIn: '7d',
      },
    );

    return refreshToken;
  }

  verifyToken(token: string, secret: string) {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }
    return decoded;
  }

  async logout(refreshToken: string) {
    const decoded = this.verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'secret_refresh_token',
    ) as RefreshTokenPayload;

    const token = await this.prisma.token.findUnique({
      where: {
        id: decoded.jti,
      },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }
    if (token.expiresAt < new Date()) {
      throw new UnauthorizedException('Token expired');
    }

    if (token.revokedAt) {
      throw new UnauthorizedException('Token has been revoked');
    }

    await this.prisma.token.update({
      where: {
        id: token.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    return {
      message: 'Logged out successfully',
    };
  }

  async refresh(refreshToken: string) {
    const decoded = this.verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'secret_refresh_token',
    ) as RefreshTokenPayload;

    const token = await this.prisma.token.findUnique({
      where: {
        id: decoded.jti,
      },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    if (token.expiresAt < new Date()) {
      throw new UnauthorizedException('Token expired');
    }

    if (token.revokedAt) {
      throw new UnauthorizedException('Token has been revoked');
    }

    const accessToken = this.generateAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    });

    const renewedRefreshToken = await this.generateRefreshToken({
      userId: decoded.userId,
      role: decoded.role,
    });

    return { accessToken, renewedRefreshToken };
  }
}
