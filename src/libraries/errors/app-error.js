export class AppError extends Error {
  constructor(message, { httpStatus = 500, isOperational = true, cause } = {}) {
    super(message, { cause });
    this.name = this.constructor.name;
    this.httpStatus = httpStatus;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource} not found`, { httpStatus: 404 });
  }
}

export class ValidationError extends AppError {
  constructor(message, fields) {
    super(message, { httpStatus: 400 });
    this.fields = fields;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, { httpStatus: 401 });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, { httpStatus: 403 });
  }
}
