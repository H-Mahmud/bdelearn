import { CONFIG } from 'src/config-global';

import { UserListView } from './student-list';



// ----------------------------------------------------------------------

export const metadata = { title: `User list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <UserListView />;
}
