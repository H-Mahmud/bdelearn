import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { auth } from 'src/auth';
import { isUserEmailVerified } from 'src/model/user';

export async function AuthGuard({ children }) {
  const session = await auth();
  if (session?.user) {
    const { id } = session.user;

    const { isVerified } = await isUserEmailVerified(id);
    if (isVerified) {
      return children;
    }
    return redirect(paths.auth.verify);
  }
  return redirect(paths.home);
}
