'use server';

import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { getUserByReferCode } from 'src/model/user';
import { SignUpSchema } from 'src/schema/userSchema';

export default async function userSignUp(formData) {
  const { success, data, error } = SignUpSchema.safeParse(formData);
  if (!success) {
    return error.formErrors;
  }

  const { referralCode } = data;
  let referrer;
  try {
    referrer = await getUserByReferCode(referralCode);
  } catch (e) {
    console.log(e);
  }

  if (!referrer) {
    return { error: 'referrer user not found' };
  }

  return redirect(paths.dashboard);
}
