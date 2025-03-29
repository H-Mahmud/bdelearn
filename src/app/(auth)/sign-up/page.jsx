import { CONFIG } from 'src/config-global';

import SignUpForm from './sign-up-form';

export const metadata = { title: `Student Sign up | ${CONFIG.site.name}` };

export default function Page() {
  return <SignUpForm />;
}
