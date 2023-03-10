import AppError from "@shared/errors/AppError";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth'
import { NextFunction, Request, Response } from "express";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401);
  }

  const [, authToken] = authHeader.split(' ');

  try {
    const decodedToken = verify(authToken, authConfig.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;

    req.user = {
      id: sub
    }

    return next()
  } catch (err: any) {
    throw new AppError('Invalid Token.', 401);
  }
}
