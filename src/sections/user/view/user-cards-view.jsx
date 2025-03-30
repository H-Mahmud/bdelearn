'use client';

import { toast } from 'sonner';
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';
import { fetchSubAdminList } from 'src/server-actions/user';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserCardList } from '../user-card-list';

// ----------------------------------------------------------------------

export function UserCardsView() {
  const [userList, seUserList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const users = await fetchSubAdminList();
        seUserList(users);
      } catch (error) {
        toast.error('Failed to fetch user data');
      }
    })();
  }, []);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Sub Admin List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Sub Admin List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.user.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New user
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserCardList users={userList} />
    </DashboardContent>
  );
}
