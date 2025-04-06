'use server';


import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { saltAndHashPassword } from 'src/utils/hash';

import { signIn } from 'src/auth';
import { SignInSchema } from 'src/schema/userSchema';
import { getUserByCredential, isUserRegisteredByEmail } from 'src/model/user';

export default async function userSignIn(formData) {
  const { data, success } = SignInSchema.safeParse(formData);

  if (!success) {
    return { field: 'root', error: 'Invalid form data' };
  }

  const { email, profile, password } = data;
  try {
    if (!(await isUserRegisteredByEmail(email, profile))) {
      return { field: 'email', error: 'No account registered with this email' };
    }

    const pwHash = saltAndHashPassword(password);
    const user = await getUserByCredential(email, profile, pwHash);
    if (!user) {
      return { field: 'password', error: 'Incorrect password' };
    }
    await signIn('credentials', {
      email,
      profile,
      password: pwHash,
      redirect: false,
      callbackUrl: '/',
    });
  } catch (e) {
    console.log(e);
    return { field: 'root', error: 'Sign In failed, Unknown server error.' };
  }

  return redirect(paths.dashboard.root);
}
