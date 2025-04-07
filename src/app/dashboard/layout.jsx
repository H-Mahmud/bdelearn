import { auth } from 'src/auth';
import { getUserById } from 'src/model/user';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthGuard } from 'src/auth/guard';

import { accountNav } from './config-nav-account';

// ----------------------------------------------------------------------

export default async function Layout({ children }) {

  let data;
  const session = await auth()

  if(session) {
    const user = await getUserById(session.user.id)
   data = {
    account: {
      nav: accountNav,
      user
    }
  }
  }

  return (
    <AuthGuard>
      <DashboardLayout data={data}>{children}</DashboardLayout>
    </AuthGuard>
  );
}
