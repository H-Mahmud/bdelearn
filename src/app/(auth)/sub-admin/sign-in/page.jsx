import { CONFIG } from 'src/config-global';

import { SubAdminSignInForm } from './sub-admin-sign-in-form';

export const metadata = { title: `Sub Admin Sign in | ${CONFIG.site.name}` };

export default function SubAdminSignIn() {
 return <SubAdminSignInForm />; 
}
