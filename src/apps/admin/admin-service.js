import * as adminRepository from './admin-repository.js';
import { VALID_ROLES } from '../../libraries/constants/index.js';
import { NotFoundError, ValidationError } from '../../libraries/errors/app-error.js';

export async function listUsers() {
  return adminRepository.findAllUsers();
}

export async function getUserById(id) {
  const user = await adminRepository.findUserById(id);

  if (!user) {
    throw new NotFoundError('User');
  }

  return user;
}

export async function updateUserRole(id, role) {
  if (!role || !VALID_ROLES.includes(role)) {
    throw new ValidationError('Invalid role', {
      role: `Must be one of: ${VALID_ROLES.join(', ')}`,
    });
  }

  const user = await adminRepository.findUserById(id);

  if (!user) {
    throw new NotFoundError('User');
  }

  return adminRepository.updateUserRole(id, role);
}
