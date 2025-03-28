'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { Field, Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import userSignUp from './sign-up-actions';
import { SignUpSchema } from 'src/schema/userSchema';


// ----------------------------------------------------------------------

export default function SignUpForm() {
  const password = useBoolean();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   console.info('DATA', data);
    await userSignUp(data)
    } catch (error) {
      console.error(error);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Already have an account?
        </Typography>

        <Link component={RouterLink} href={paths.studentAuth.signIn} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Field.Text name="firstName" label="First name" InputLabelProps={{ shrink: true }} />
        <Field.Text name="lastName" label="Last name" InputLabelProps={{ shrink: true }} />
      </Stack>

      <Field.Text name="email" label="Email address" InputLabelProps={{ shrink: true }} />

      <Field.Text
        name="password"
        label="Password"
        placeholder="6+ characters"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Create account..."
      >
        Create account
      </LoadingButton>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 3,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy policy
      </Link>
      .
    </Typography>
  );


  return (
    <>
      {renderHead}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      {renderTerms}
    </>
  );
}
