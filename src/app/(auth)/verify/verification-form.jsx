'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { signOut } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { EmailInboxIcon } from 'src/assets/icons';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

export const VerifySchema = zod.object({
  code: zod
    .string()
    .min(1, { message: 'Code is required!' })
    .min(6, { message: 'Code must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export default function VerificationForm() {
  const defaultValues = { code: '' };

  const methods = useForm({
    resolver: zodResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderHead = (
    <>
      <EmailInboxIcon sx={{ mx: 'auto' }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5, textAlign: 'center', whiteSpace: 'pre-line' }}>
        <Typography variant="h5">Please check your email!</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`We've emailed a 6-digit confirmation code. \nPlease enter the code in the box below to verify your email.`}
        </Typography>
      </Stack>
    </>
  );

  const renderForm = (
    <Stack spacing={3}>
    

      <Field.Code name="code" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Verify..."
      >
        Verify
      </LoadingButton>

      <Typography variant="body2" sx={{ mx: 'auto' }}>
        {`Don’t have a code? `}
        <Link variant="subtitle2" sx={{ cursor: 'pointer' }}>
          Resend code
        </Link>
      </Typography>

      <Button
        onClick={() => signOut()}
        color="inherit"
        variant="text"
        sx={{ mx: 'auto', alignItems: 'center', display: 'inline-flex' }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} sx={{ mr: 0.5 }} />
        Sign Out
      </Button>
    </Stack>
  );

  return (
    <>
      {renderHead}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
