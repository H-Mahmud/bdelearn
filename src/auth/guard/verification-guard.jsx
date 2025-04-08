'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import getVerificationStatus from './get-verification-status';

// ----------------------------------------------------------------------

export function VerificationGuard({ children }) {
  const [isChecking, setIsChecking] = useState(true);

  const session = useSession();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  const authenticated = session.status === 'authenticated';
  const loading = session.status === 'loading';

  

  const checkPermissions = async () => {
    if (loading) return;
    if (!authenticated) {router.replace(paths.auth.student.signIn); return}
    if(isVerified) {router.replace(paths.dashboard.root); return};

    setIsVerified(await getVerificationStatus(session.data.user.id))
    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ loading, isVerified]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return children;
}
