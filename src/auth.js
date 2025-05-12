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
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.profile = token.profile;
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.profile = user.profile;
        token.email = user.email;
      }
      return token;
    },
  },
});

export async function getUserId() {
  const session = await auth();
  if (!session.user) {
    throw new Error('User not found');
  }

  return session.user.id;
}

export const PROFILES = {
  student: 'STUDENT',
  admin: 'ADMIN',
  controller: 'CONTROLLER',
  counselor: 'COUNSELOR',
  trainer: 'TRAINER',
  superAdmin: 'SUPER_ADMIN',
};

export const CURRENT_USER_CAN = {
  deleteStudent: 'DELETE_STUDENT',
};

export async function currentUserCan($option) {
  return false;
}
