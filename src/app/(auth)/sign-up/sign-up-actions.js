'use server';

import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { newReferralCode } from 'src/utils/hash';

import { SignUpSchema } from 'src/schema/userSchema';
import {
  createUser,
  getUserIdByReferCode,
  isUserRegisteredByEmail,
  isUserRegisteredByPhoneNumber,
} from 'src/model/user';

// ----------------------------------------------------------------------

export default async function userSignUp(formData) {
  const { success, data } = SignUpSchema.safeParse(formData);
  if (!success) {
    return { field: 'root', error: 'Invalid form data' };
  }

  const { firstName, lastName, email, phoneNumber, profile, password, referralCode } = data;

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

    const referrer = await getUserIdByReferCode(referralCode, 'STUDENT');
    if (!referrer) {
      return {
        field: 'referralCode',
        error: 'Invalid referral Code, No user found with this referral code.',
      };
    }
    const myReferral = newReferralCode();

    await createUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      myReferral,
      referrer,
      'PENDING',
      profile
    );
  } catch (e) {
    console.log(e);
    return { field: 'root', error: 'Unknown server error.' };
  }

  return redirect(paths.dashboard.root);
}
