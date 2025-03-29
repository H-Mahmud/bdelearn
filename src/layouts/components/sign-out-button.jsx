import { signOut } from 'next-auth/react';

import Button from '@mui/material/Button';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export function SignOutButton({ onClose, ...other }) {
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.refresh();
  };

  return (
    <Button fullWidth variant="soft" size="large" color="error" onClick={handleLogout} {...other}>
      Logout
    </Button>
  );
}
