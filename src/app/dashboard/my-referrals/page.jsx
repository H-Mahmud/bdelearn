import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `My Referrals | Dashboard - ${CONFIG.site.name}` };

export default function MyReferralsPage() {
  return <BlankView title="My Referrals" />;
}
