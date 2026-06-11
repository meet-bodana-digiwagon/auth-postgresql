import { Router } from 'express';
import { auth } from './auth.js';

const router = Router();

router.get('/routes', (req, res) => {
  res.json({
    authEndpoints: {
      signUp: { method: 'POST', path: '/api/auth/sign-up/email', body: { email: 'string', password: 'string', name: 'string (optional)' } },
      signIn: { method: 'POST', path: '/api/auth/sign-in/email', body: { email: 'string', password: 'string' } },
      session: { method: 'GET', path: '/api/auth/get-session' },
      signOut: { method: 'POST', path: '/api/auth/sign-out' },
      forgetPassword: { method: 'POST', path: '/api/auth/forget-password', body: { email: 'string' } },
      resetPassword: { method: 'POST', path: '/api/auth/reset-password', body: { newPassword: 'string', token: 'string' } },
      verifyEmail: { method: 'POST', path: '/api/auth/verify-email', body: { token: 'string' } },
    },
    testEndpoints: {
      session: { method: 'GET', path: '/api/test/session', description: 'Check current session' },
      health: { method: 'GET', path: '/api/test/health' },
      routes: { method: 'GET', path: '/api/test/routes', description: 'This help page' },
    },
    notes: [
      'CSRF check is disabled in development (NODE_ENV=development)',
      'In Postman, endpoints return JSON - no special headers needed',
      'Use GET /api/auth/get-session (not /session) to check auth state',
    ],
  });
});

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    node: process.version,
  });
});

router.get('/session', async (req, res, next) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json(session);
  } catch (err) {
    next(err);
  }
});

export { router as testRouter };
