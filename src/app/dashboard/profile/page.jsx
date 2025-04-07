
import { getUserId } from 'src/auth';
import { CONFIG } from 'src/config-global';
import { getUserById } from 'src/model/user';

import { UserProfileView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Profile | Dashboard - ${CONFIG.site.name}` };

export default async function ProfilePage() {
  const userId = await getUserId();
  const user = await getUserById( userId);

  return <UserProfileView data={{user}} />;
}
