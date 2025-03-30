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

export async function fetchUserList() {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users;
}
