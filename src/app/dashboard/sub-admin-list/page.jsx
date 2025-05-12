import { CONFIG } from 'src/config-global';
import { getSubAdminList } from 'src/model/user';

import { UserCardsView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `User cards | Dashboard - ${CONFIG.site.name}` };

export default async function SubAdminListPage() {
  const userList = await getSubAdminList();
  return <UserCardsView userList={userList} />;
}
