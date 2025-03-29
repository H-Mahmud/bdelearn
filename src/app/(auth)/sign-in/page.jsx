import { CONFIG } from 'src/config-global';

import SignInForm from './sign-in-form';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | ${CONFIG.site.name}` };

export default function Page() {
  return <SignInForm />;
}
