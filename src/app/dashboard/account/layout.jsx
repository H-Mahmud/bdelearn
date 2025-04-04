import { DashboardContent } from 'src/layouts/dashboard';

import AccountTabs from './account-tabs';

export default function Layout({ children }) {
  return (
    <DashboardContent>
    <AccountTabs />
      {children}
    </DashboardContent>
  );
}
