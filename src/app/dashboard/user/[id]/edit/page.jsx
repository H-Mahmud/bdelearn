import { CONFIG } from 'src/config-global';
import { getUserById } from 'src/model/user';

import { UserEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `User edit | Dashboard - ${CONFIG.site.name}` };

export default async function Page({params}) {
  const { id } = await params;

  const currentUser = await getUserById(id);

  return <UserEditView user={currentUser} />;
}

export const dynamic = 'force-dynamic';

