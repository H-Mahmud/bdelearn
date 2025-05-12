import _ from 'lodash';

import db from 'src/db';
import { getUserId } from 'src/auth';
import { DashboardContent } from 'src/layouts/dashboard';

import AccountTabs from './account-tabs';

export default async function AccountPage() {
  const id = await getUserId();
  const result = await db.user.findUnique({where: {id}})
  const user = _.omit(result, ['password']);
  return (
    <DashboardContent maxWidth='lg'>
    <AccountTabs data={{user}} />
    </DashboardContent>
  );
}

export const dynamic = 'force-dynamic';