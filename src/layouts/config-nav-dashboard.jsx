import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  profile: icon('ic-profile'),
  analytics: icon('ic-analytics'),
  referral: icon('ic-referral'),
  subAdmin: icon('ic-sub-admin'),
  students: icon('ic-student'),
  account: icon('ic-account'),
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'Profile', path: paths.dashboard.profile, icon: ICONS.profile },
      { title: 'Analytics', path: paths.dashboard.analytics, icon: ICONS.analytics },
      { title: 'My Referrals', path: paths.dashboard.myReferrals, icon: ICONS.referral },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'Sub Admin List',
        path: paths.dashboard.subAdminList,
        icon: ICONS.subAdmin,
      },
      {
        title: 'Student List',
        path: paths.dashboard.studentList,
        icon: ICONS.students,
      },
      {
        title: 'Account',
        path: paths.dashboard.account.root,
        icon: ICONS.account,
        // children: [
          // { title: 'General', path: paths.dashboard.account.root },
          // { title: 'Billing', path: paths.dashboard.account.billing },
          // { title: 'Notification', path: paths.dashboard.account.notifications },
          // { title: 'Social Link', path: paths.dashboard.account.socialLink },
          // { title: 'Security', path: paths.dashboard.account.security },
        // ],
      },
      // {
      //   title: 'User',
      //   path: paths.dashboard.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Profile', path: paths.dashboard.user.root },
      //     { title: 'Create', path: paths.dashboard.user.new },
      //     { title: 'Edit', path: paths.dashboard.user.demo.edit },
      //   ],
      // },
      // {
      //   title: 'Group',
      //   path: paths.dashboard.group.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Four', path: paths.dashboard.group.root },
      //     { title: 'Five', path: paths.dashboard.group.five },
      //     { title: 'Six', path: paths.dashboard.group.six },
      //   ],
      // },
    ],
  },
];
