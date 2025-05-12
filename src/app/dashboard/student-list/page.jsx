import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import db from 'src/db';
import { getUserId } from 'src/auth';
import { CONFIG } from 'src/config-global';
import { getUserCountByStatus } from 'src/model/user';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import UserList from 'src/sections/user-list';


const STATUS_OPTION = [
  { value: '', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'BLOCKED', label: 'Blocked' },
];

// ----------------------------------------------------------------------

export const metadata = { title: `Student List | Dashboard - ${CONFIG.site.name}` };

export default async function StudentListPage({searchParams }) {
  const params = (await searchParams);
  const where = {}

  STATUS_OPTION.forEach(item => {
    if(item.value && item.value === params.status) {
      where.status = params.status
    }
  });


  const keyword = params?.s;
  if(keyword) {
    where.OR = [
      { email: { contains: keyword, mode: "insensitive" } },
      { phoneNumber: { contains: keyword, mode: "insensitive" } },
      { referralCode: { contains: keyword, mode: "insensitive" } },
      { firstName: { contains: keyword, mode: "insensitive" } },
      { lastName: { contains: keyword, mode: "insensitive" } },
      { country: { contains: keyword, mode: "insensitive" } },
      { city: { contains: keyword, mode: "insensitive" } },
      { zipCode: { contains: keyword, mode: "insensitive" } },
      { bio: { contains: keyword, mode: "insensitive" } },
    ]
  }

  const students = await db.user.findMany({where})
  const studentCountByStatus = await getUserCountByStatus();

  const currentUser = await db.user.findUnique({where: {
    id: (await getUserId())
  }, select: {
    profile: true
  }})

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="My Referrals"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'My Referrals' }]}
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
      <UserList data={{
         studentList: students,
         studentCount: studentCountByStatus,
         statuses: STATUS_OPTION,
        params,
        user: currentUser
      }} />
    </DashboardContent>
  );
}
// const TABLE_HEAD = [
//   { id: 'name', label: 'Name' },
//   { id: 'referralCode', label: 'Referral ID', width: 180 },
//   { id: 'phoneNumber', label: 'Phone number', width: 180 },
//   { id: 'createdAt', label: 'Joined', width: 180 },
//   { id: 'status', label: 'Status', width: 100 },
//   { id: '', width: 88 },
// ];