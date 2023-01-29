import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible'
import Redis from 'ioredis';
import AppError from '@shared/errors/AppError';
import cacheConfig from '@config/cache';

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const redisClient = new Redis(cacheConfig.config.redis)

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1
    });

    await limiter.consume(req.ip);
    return next();
  } catch (err) {
    throw new AppError('To many requests', 429);
  }
}
