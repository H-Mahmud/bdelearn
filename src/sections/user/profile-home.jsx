'use client';

import { useRef } from 'react';
import { toast } from 'sonner';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import { Table, TableRow, TableBody, TableCell, Typography, ButtonBase } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _socials } from 'src/_mock';
import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';

import { Iconify, SocialIcon } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ProfileHome({ info, posts, user }) {
  const fileRef = useRef(null);

  const handleAttach = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const renderStudentId = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
            {user.referralCode}
            <ButtonBase
              onClick={() => {
                navigator.clipboard.writeText(user.referralCode);
                toast.success('Student ID copied to clipboard successfully!');
              }}
            >
              <Iconify icon="solar:copy-bold" />
            </ButtonBase>
          </Stack>
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Student ID
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderFollows = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {user.status}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Status
          </Box>
        </Stack>

        <Stack width={1}>
          {user.balance ?? 0}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Balance
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAbout = (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: 'body2' }}>{user.bio}</Box>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {`Live at `}
            <Link variant="subtitle2" color="inherit">
              {user.country}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          <Link href={`mailto:${user.email}`} variant="subtitle2" color="inherit">
            {user.email}
          </Link>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:phone-fill" width={24} />
          <Link href={`tel:${user.phoneNumber}`} variant="subtitle2" color="inherit">
            {user.phoneNumber}
          </Link>
        </Stack>
      </Stack>
    </Card>
  );

  const renderPostInput = (
    <Card sx={{ p: 3 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1,
          border: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
        }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
          <Fab size="small" color="inherit" variant="softExtended" onClick={handleAttach}>
            <Iconify icon="solar:gallery-wide-bold" width={24} sx={{ color: 'success.main' }} />
            Image/Video
          </Fab>

          <Fab size="small" color="inherit" variant="softExtended">
            <Iconify icon="solar:videocamera-record-bold" width={24} sx={{ color: 'error.main' }} />
            Streaming
          </Fab>
        </Stack>

        <Button variant="contained">Post</Button>
      </Stack>

      <input ref={fileRef} type="file" style={{ display: 'none' }} />
    </Card>
  );

  const renderSocials = (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link) => (
          <Stack
            key={link.name}
            spacing={2}
            direction="row"
            sx={{ wordBreak: 'break-all', typography: 'body2' }}
          >
            <SocialIcon icon={link.value} />
            <Link color="inherit">
              {link.value === 'facebook' && info.socialLinks.facebook}
              {link.value === 'instagram' && info.socialLinks.instagram}
              {link.value === 'linkedin' && info.socialLinks.linkedin}
              {link.value === 'twitter' && info.socialLinks.twitter}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );

  const referralUrl = `${CONFIG.site.basePath}${paths.auth.student.signUp}?referralCode=${user.referralCode}`;
  const messageText = `Create a free account to get courses and learn money from referral: ${referralUrl}`;
  const renderShare = (
    <Card>
      <CardHeader title="Share your referral" />
      <Stack sx={{ flexDirection: 'row', spacing: 5, mt: 1, mb: 2 }}>
        <Button
          component={RouterLink}
          target="_blank"
          href={`https://www.facebook.com/sharer/sharer.php?u=${referralUrl}`}
        >
          <Iconify icon="eva:facebook-fill" width={48} color="#1877f2" />
        </Button>

        <Button
          component={RouterLink}
          target="_blank"
          href={`fb-messenger://share?link=${referralUrl}`}
        >
          <Iconify icon="mingcute:messenger-line" width={48} color="#2692f0" />
        </Button>

        <Button component={RouterLink} target="_blank" href={`tg://msg?text=${messageText}`}>
          <Iconify icon="mingcute:telegram-line" width={48} color="#2a9cd7" />
        </Button>

        <Button component={RouterLink} target="_blank" href={`whatsapp://send?text=${messageText}`}>
          <Iconify icon="ic:baseline-whatsapp" width={48} color="#25d366" />
        </Button>

        <Button component={RouterLink} target="_blank" href={`sms:?body=${messageText}`}>
          <Iconify icon="ic:baseline-perm-phone-msg" width={48} color="#5bf174" />
        </Button>

        <Button
          component={RouterLink}
          target="_blank"
          href={`mailto:?subject=Create%20a%20Free%20Account%20and%20Start%20Learning%20Today&body=${messageText}`}
        >
          <Iconify icon="ic:baseline-attach-email" width={48} color="#fed83a" />
        </Button>

        <Button
          onClick={() => {
            navigator.clipboard.writeText(referralUrl);
            toast.success('Referral Url copied to clipboard successfully!');
          }}
        >
          <Iconify icon="ic:baseline-content-copy" width={48} color="#3f91f0" />
        </Button>
      </Stack>
    </Card>
  );

  const renderUserDetails = (
    <Card>
      <CardHeader title="Personal Information" />
      <Stack sx={{ p: 1 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="body2">First Name</Typography>
                <Typography variant="h6">{user.firstName}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">Last Name</Typography>
                <Typography variant="h6">{user.lastName}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body2">Email</Typography>
                <Typography variant="h6">{user.email}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">Phone Number</Typography>
                <Typography variant="h6">{user.phoneNumber}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body2">Country</Typography>
                <Typography variant="h6">{user.country}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">City</Typography>
                <Typography variant="h6">{user.city}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body2">State</Typography>
                <Typography variant="h6">{user.state}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">Zip Code</Typography>
                <Typography variant="h6">{user.zipCode}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body2">Address</Typography>
                <Typography variant="h6">{user.address}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">Gender</Typography>
                <Typography variant="h6">{user.gender}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          {user.profile === 'STUDENT' ? renderStudentId : null}

          {renderFollows}

          {renderAbout}

          {/* {renderSocials} */}
        </Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          {renderShare}

          {renderUserDetails}
        </Stack>
      </Grid>
    </Grid>
  );
}
