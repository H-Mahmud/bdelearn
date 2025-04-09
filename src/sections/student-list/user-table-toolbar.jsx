import Form from 'next/form'

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function UserTableToolbar({ data: {params}, onResetPage }) {

  return (
    <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      ><Form action={paths.dashboard.myReferrals}>

      {Object.entries(params || {}).map(([key, value]) => 
        key !== 's' && <input key={key} type="hidden" name={key} value={value} />
      )}

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          
          <TextField
            fullWidth
            name='s'
            defaultValue={params?.s}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <Button variant='contained' size='large' type='submit'>
            <Iconify icon="eva:search-fill" />
            Search
          </Button>
        </Stack>
        </Form>
      </Stack>
  );
}