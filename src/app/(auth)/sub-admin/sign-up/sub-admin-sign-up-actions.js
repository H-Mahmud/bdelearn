'use server';

import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { subAdminSignUpSchema } from 'src/schema/userSchema';
import {
  createSubAdminUser,
  isUserRegisteredByEmail,
  isUserRegisteredByPhoneNumber,
} from 'src/model/user';

// ----------------------------------------------------------------------

export default async function subAdminSignUp(formData) {
  const { success, data } = subAdminSignUpSchema.safeParse(formData);
  if (!success) {
    return { field: 'root', error: 'Invalid form data' };
  }

  const { firstName, lastName, email, phoneNumber, profile, password } = data;

  try {
    if (await isUserRegisteredByEmail(email, profile)) {
      return {
        field: 'email',
        error: 'An account with this email already exists.',
      };
    }

    if (await isUserRegisteredByPhoneNumber(phoneNumber, profile)) {
      return {
        field: 'phoneNumber',
        error: 'An account with this phone number already exists.',
      };
    }

    await createSubAdminUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      'PENDING',
      profile
    );
  } catch (e) {
    console.log(e);
    return { field: 'root', error: 'Unknown server error.' };
  }

  return redirect(paths.dashboard.root);
}
