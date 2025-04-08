import { DashboardContent } from 'src/layouts/dashboard';

import AccountTabs from './account-tabs';

export default function AccountPage() {
  return (
    <DashboardContent maxWidth='lg'>
    <AccountTabs />
    </DashboardContent>
  );
}
