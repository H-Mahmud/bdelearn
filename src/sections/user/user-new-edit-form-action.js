'use server';

import db from 'src/db';
import { getUserById } from 'src/model/user';
import { currentUserCan, CURRENT_USER_CAN } from 'src/auth';

export default async function userNewEditFormAction(values) {
  if (!currentUserCan(CURRENT_USER_CAN.editUser))
    return { field: 'root', message: 'Unauthenticated request!' };

  try {
    const {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      address,
      state,
      city,
      zipCode,
      bio,
      isVerified,
      password
    } = values;

    if (id) {
      const user = await getUserById(id);
      if (!user) throw new Error('No user found by the provided ID');
      await db.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
          country,
          address,
          state,
          city,
          zipCode,
          bio,
          isVerified,
        },
      });

      return { success: true, action: 'updated' };
    } 
     await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        country,
        address,
        state,
        city,
        zipCode,
        bio,
        isVerified,
        password
      },
    });

    console.log('created')
    return { success: true, action: 'created' };
    

  } catch (error) {
    if (error instanceof Error) {
      return { field: 'root', message: error.message };
    }
    console.log(error);
    return { field: 'root', message: 'Action failed, Internal Server error!' };
  }
}
