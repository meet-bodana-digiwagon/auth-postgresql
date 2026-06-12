import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { authHandler } from './apps/auth/auth-router.js';
import { adminRouter } from './apps/admin/admin-router.js';
import { errorHandler } from './libraries/errors/handler.js';
import { logger } from './libraries/logger/index.js';
import { authenticate, authorize } from './middleware/auth.js';

const app = express();

app.use(helmet());
app.use(express.json({ limit: '100kb' }));

app.use((req, res, next) => {
  const start = performance.now();
  res.on('finish', () => {
    logger.info(
      {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: `${(performance.now() - start).toFixed(0)}ms`,
      },
      'request'
    );
  });
  next();
});

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: 'Too many attempts, try again later' },
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  message: { error: 'Too many requests, try again later' },
});

//Global Rate limiter
app.use(globalLimiter);

//Health
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

//Public API routes
app.use('/api/auth', authLimiter, authHandler);

//Autheticated API routes
app.use(authenticate);

//Admin API routes
app.use(adminLimiter, authorize('admin'));
app.use('/api/admin', adminRouter);

app.use(errorHandler);

export { app };
