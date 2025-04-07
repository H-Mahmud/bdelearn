import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { auth } from 'src/auth';

export async function AuthGuard({ children }) {
  const session = await auth();
  if (!session) return redirect(paths.home);

  return children;
}
