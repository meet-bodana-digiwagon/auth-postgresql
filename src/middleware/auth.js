import { auth } from '../apps/auth/auth.js';
import { UnauthorizedError, ForbiddenError } from '../libraries/errors/app-error.js';

export async function authenticate(req, res, next) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session || !session.user) {
      throw new UnauthorizedError('Invalid or missing session');
    }

    req.user = session.user;
    next();
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return next(err);
    }
    return next(new UnauthorizedError('Invalid or missing session'));
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    next();
  };
}
