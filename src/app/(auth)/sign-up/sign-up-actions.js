'use server';

import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { SignUpSchema } from 'src/schema/userSchema';
import {
  createStudent,
  getStudentByReferCode,
  isStudentRegisteredByEmail,
  isStudentRegisteredByPhoneNumber,
} from 'src/model/user';

export default async function userSignUp(formData) {
  const { success, data } = SignUpSchema.safeParse(formData);
  if (!success) {
    return { field: null, error: 'Invalid form data' };
  }

  const { firstName, lastName, email, phoneNumber, referralCode } = data;

  try {
    if (await isStudentRegisteredByEmail(email)) {
      return {
        field: 'email',
        error: 'An account with this email already exists.',
      };
    }

    if (await isStudentRegisteredByPhoneNumber(phoneNumber)) {
      return {
        field: 'phoneNumber',
        error: 'An account with this phone number already exists.',
      };
    }

    const referrer = await getStudentByReferCode(referralCode);
    if (!referrer) {
      return {
        field: 'referralCode',
        error: 'Invalid referral Code, No student found by the referral code.',
      };
    }

    await createStudent(firstName, lastName, email, phoneNumber, referrer);
  } catch (e) {
    console.log(e);
    return { field: null, error: 'Unknown server error.' };
  }

  return redirect(paths.dashboard);
}
