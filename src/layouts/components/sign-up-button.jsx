import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

export default function SignUpButton({up, layoutQuery}) {
    return <Button
    data-slot="sign-up"
    component={RouterLink}
    variant="contained"
    href={paths.studentAuth.signUp}
    sx={{
      display: 'none',
      [up(layoutQuery)]: {
        display: 'inline-flex',
      },
    }}
  >
    Sign Up
  </Button>
}