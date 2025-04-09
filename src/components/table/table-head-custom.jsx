import _ from 'lodash';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';

import { PROFILES } from 'src/auth';

import { RoleBasedGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

// ----------------------------------------------------------------------

export function TableHeadCustom({
  user,
  sx,
  rowCount = 0,
  numSelected = 0,
  onSelectAllRows,
}) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        <RoleBasedGuard
          currentRole={user.profile}
          acceptRoles={_.pick(PROFILES, ['superAdmin', 'admin'])}
        >
          {onSelectAllRows && (
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={!!numSelected && numSelected < rowCount}
                checked={!!rowCount && numSelected === rowCount}
                onChange={(event) => onSelectAllRows(event.target.checked)}
                inputProps={{
                  name: 'select-all-rows',
                  'aria-label': 'select all rows',
                }}
              />
            </TableCell>
          )}
        </RoleBasedGuard>

        <TableCell sx={{ width: 120, minWidth: 120 }}>Student ID</TableCell>
        <TableCell>Name</TableCell>

        <RoleBasedGuard currentRole={user.profile} acceptRoles={_.pick(PROFILES, ['student'])}>
          <TableCell sx={{ width: 200, minWidth: 250 }}>Counsellor</TableCell>
        </RoleBasedGuard>

        <TableCell sx={{ width: 160, minWidth: 120 }}>Phone number</TableCell>
        <TableCell sx={{ width: 200, minWidth: 120 }}>Joined</TableCell>
        <TableCell sx={{ width: 40, minWidth: 40 }}>Status</TableCell>
        <TableCell  sx={{ width: 40, minWidth: 40 }}>Whatsapp</TableCell>
      </TableRow>
    </TableHead>
  );
}
