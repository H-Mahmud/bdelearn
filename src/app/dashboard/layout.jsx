import { auth } from 'src/auth';
import { getUserById } from 'src/model/user';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthGuard } from 'src/auth/guard';

import { accountNav } from './config-nav-account';

// ----------------------------------------------------------------------

export default async function Layout({ children }) {

  const session = await auth()

  const user = await getUserById(session.user.id)

  const data = {
    account: {
      nav: accountNav,
      user
    }
  }

  return (
    <AuthGuard>
      <DashboardLayout data={data}>{children}</DashboardLayout>
    </AuthGuard>
  );
}
