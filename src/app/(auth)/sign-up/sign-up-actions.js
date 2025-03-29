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

export default async function userSignUp(formData) {
  const { success, data } = SignUpSchema.safeParse(formData);
  if (!success) {
    return { field: null, error: 'Invalid form data' };
  }

  const { firstName, lastName, email, phoneNumber, password, referralCode } = data;

  try {
    if (await isUserRegisteredByEmail(email, 'STUDENT')) {
      return {
        field: 'email',
        error: 'An account with this email already exists.',
      };
    }

    if (await isUserRegisteredByPhoneNumber(phoneNumber, 'STUDENT')) {
      return {
        field: 'phoneNumber',
        error: 'An account with this phone number already exists.',
      };
    }

    const referrer = await getUserIdByReferCode(referralCode, 'STUDENT');
    if (!referrer) {
      return {
        field: 'referralCode',
        error: 'Invalid referral Code, No student found by the referral code.',
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
      'PENDING'
    );
  } catch (e) {
    console.log(e);
    return { field: null, error: 'Unknown server error.' };
  }

  return redirect(paths.dashboard.root);
}
