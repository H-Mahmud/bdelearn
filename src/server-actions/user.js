'use server';

import db from 'src/db';
import { currentUserCan, CURRENT_USER_CAN } from 'src/auth';

export async function deleteUser(userId) {
  if (!userId) return { success: false, error: 'UserId is required.' };

  try {
    if (!currentUserCan(CURRENT_USER_CAN.deleteStudent)) throw new Error('Unauthorized request.');

    await db.user.delete({ where: { id: userId } });
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
