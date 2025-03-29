import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { saltAndHashPassword } from './utils/hash';
import { getUserByCredential } from './model/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const { email, profile, password } = credentials;

        const pwHash = saltAndHashPassword(password);

        user = await getUserByCredential(email, profile, pwHash);
        if (!user) throw new Error('Invalid email or password.');

        return user;
      },
    }),
  ],
});
