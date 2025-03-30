'use server';

import db from 'src/db';
import { auth } from 'src/auth';

export async function fetchUserData() {
  const session = await auth();

  if (!session.user) {
    throw new Error('Unauthorized');
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function fetchUserList(filters = {}) {
  const { name, status, role } = filters;

  const users = await db.user.findMany({
    where: {
      ...(name && {
        OR: [
          { firstName: { contains: name, mode: 'insensitive' } },
          { lastName: { contains: name, mode: 'insensitive' } },
        ],
      }),
      ...(status && status !== 'all' && { status }),
      ...(role && role.length > 0 && { profile: { in: role } }),
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      referralCode: true,
      status: true,
      profile: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users.map((user) => ({
    ...user,
    name: `${user.firstName} ${user.lastName}`,
    createdAt: user.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  }));
}

// Count User by Status
export async function fetchCountUserByStatus() {
  const userCount = await db.user.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  });

  return userCount.reduce((acc, { status, _count }) => {
    acc[status] = _count.id;
    return acc;
  }, {});
}
