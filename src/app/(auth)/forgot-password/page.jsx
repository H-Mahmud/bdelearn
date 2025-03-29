import { CONFIG } from 'src/config-global';

import { ForgotPasswordForm } from './forgot-password-form';

// ----------------------------------------------------------------------

export const metadata = { title: `Reset password | ${CONFIG.site.name}` };

export default function Page() {
  return <ForgotPasswordForm />;
}
