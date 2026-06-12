import { prisma } from '../../lib/prisma.js';

const SELECT_USER_FIELDS = {
  id: true,
  name: true,
  email: true,
  role: true,
  banned: true,
  createdAt: true,
  updatedAt: true,
};

const SELECT_USER_DETAIL_FIELDS = {
  ...SELECT_USER_FIELDS,
  banReason: true,
  banExpires: true,
};

export async function findAllUsers() {
  return prisma.user.findMany({
    select: SELECT_USER_FIELDS,
    orderBy: { createdAt: 'desc' },
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: SELECT_USER_DETAIL_FIELDS,
  });
}

export async function updateUserRole(id, role) {
  return prisma.user.update({
    where: { id },
    data: { role },
    select: SELECT_USER_FIELDS,
  });
}
