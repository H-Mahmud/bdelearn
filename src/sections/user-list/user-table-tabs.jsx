import React, { useState } from 'react';

import { Tab, Tabs } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';

export default function UserTableTabs({ data }) {
  const {statuses, studentCount, params} = data;
  const [value, setValue,] = useState(params?.status ?? '');

  const urlParams = new URLSearchParams(params);
  return (
    <Tabs
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      sx={{
        px: 2.5,
        boxShadow: (theme) =>
          `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
      }}
    >
      {statuses.map((tab) =>{ 
        urlParams.set('status',tab.value);
        return(
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          LinkComponent={RouterLink}
          href={`${paths.dashboard.myReferrals}?${urlParams.toString()}`}
          icon={
            <Label
              variant={
                ((tab.value === '' || tab.value === value) && 'filled') || 'soft'
              }
              color={
                (tab.value === 'ACTIVE' && 'success') ||
                (tab.value === 'INACTIVE' && 'secondary') ||
                (tab.value === 'PENDING' && 'info') ||
                (tab.value === 'SUSPENDED' && 'warning') ||
                (tab.value === 'BLOCKED' && 'error') ||
                'default'
              }
            >
              {studentCount[tab.value] ? studentCount[tab.value] : 0}
            </Label>
          }
        />
      )})}
    </Tabs>
  );
}
