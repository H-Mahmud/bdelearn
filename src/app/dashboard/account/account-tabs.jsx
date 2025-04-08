'use client';

import { useRouter, usePathname } from 'next/navigation';

import { Tab, Tabs } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import AccountGeneral from './account-general';
import AccountSecurity from './account-security';

// ----------------------------------------------------------------------

const NAV_ITEMS = [
  {
    href: paths.dashboard.account.root,
    label: 'General',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  // {
  //   href: paths.dashboard.account.billing,
  //   label: 'Billing',
  //   icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  // },
  // {
  //   href: paths.dashboard.account.notifications,
  //   label: 'Notifications',
  //   icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
  // },
  // {
  //   href: paths.dashboard.account.socialLink,
  //   label: 'Social links',
  //   icon: <Iconify icon="solar:share-bold" width={24} />,
  // },
  {
    href: paths.dashboard.account.security,
    label: 'Security',
    icon: <Iconify icon="ic:round-vpn-key" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function AccountTabs() {
  const pathname = usePathname();
  const activePath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const route = useRouter();
  const tabs = useTabs(activePath);
  console.log('active Path', activePath);
  console.log('tab value', tabs.value);
  const activeTab = NAV_ITEMS.find((item) => item.href === activePath)?.label || 'General';


  return (
    <>
      <CustomBreadcrumbs
        heading="Account"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Account', href: paths.dashboard.account.root },
          { name: activeTab,  },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
        {NAV_ITEMS.map((tab) => (
          <Tab
            key={tab.href}
            label={tab.label}
            icon={tab.icon}
            value={tab.href}
            onClick={() => {
              route.push(tab.href);
            }}
          />
        ))}
      </Tabs>

      {tabs.value === paths.dashboard.account.root && <AccountGeneral />}
      {tabs.value === paths.dashboard.account.security && <AccountSecurity />}
      </>
  );
}
