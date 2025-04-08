'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { useTabs } from 'src/hooks/use-tabs';

import { _userAbout, _userFeeds } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProfileHome } from '../profile-home';
import { ProfileCover } from '../profile-cover';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'profile', label: 'Profile', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
  { value: 'followers', label: 'Followers', icon: <Iconify icon="solar:heart-bold" width={24} /> },
  {
    value: 'friends',
    label: 'Friends',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
  {
    value: 'gallery',
    label: 'Gallery',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export function UserProfileView({data}) {
  const { user } = data;

  const [searchFriends, setSearchFriends] = useState('');

  const tabs = useTabs('profile');

  const handleSearchFriends = useCallback((event) => {
    setSearchFriends(event.target.value);
  }, []);

  return (
    <DashboardContent>
      <Card sx={{ mb: 3, height: 290 }}>
        <ProfileCover
          role={user.profile}
          name={`${user.firstName} ${user.lastName}`}
          avatarUrl={user?.photoURL}
          coverUrl={_userAbout.coverUrl}
        />

        <Box
          display="flex"
          justifyContent={{ xs: 'center', md: 'flex-end' }}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            px: { md: 3 },
            position: 'absolute',
            bgcolor: 'background.paper',
          }}
        >
          {/* <Stack py={1} direction="row" alignItems="center" justifyContent="flex-start" spacing={2} variant='body2'>STUDENT ID: <Typography variant='h6'>{user.referralCode}</Typography></Stack> */}
        </Box>
      </Card>

      <ProfileHome info={_userAbout} posts={_userFeeds} user={user} />

      {/* {tabs.value === 'followers' && <ProfileFollowers followers={_userFollowers} />}

      {tabs.value === 'friends' && (
        <ProfileFriends
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={handleSearchFriends}
        />
      )}

      {tabs.value === 'gallery' && <ProfileGallery gallery={_userGallery} />} */}
    </DashboardContent>
  );
}
