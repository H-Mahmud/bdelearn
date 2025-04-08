import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Stack, Container } from '@mui/material';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Label, labelClasses } from 'src/components/label';

// ----------------------------------------------------------------------

export function CourseList({ title, list, ...other }) {
  return (
<Container maxWidth="lg">
  <Stack>
    <Typography variant="h3" sx={{ mb: 1 }}>
      {title}
    </Typography>

    <Grid container spacing={4} sx={{ px: 0.5 }}>
      {list.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CourseItem item={item} />
        </Grid>
      ))}
    </Grid>
  </Stack>
</Container>
  );
}

function CourseItem({ item, ...other }) {
  const renderImage = (
    <Box sx={{ px: 1, pt: 1 }}>
      <Image alt={item.title} src={item.coverUrl} ratio="5/4" sx={{ borderRadius: 1.5 }} />
    </Box>
  );

  const renderLabels = (
    <Box
      sx={{
        gap: 1,
        mb: 1.5,
        display: 'flex',
        flexWrap: 'wrap',
        [`& .${labelClasses.root}`]: {
          typography: 'caption',
          color: 'text.secondary',
        },
      }}
    >
      <Label startIcon={<Iconify width={12} icon="solar:clock-circle-outline" />}>1h 40m</Label>

      <Label startIcon={<Iconify width={12} icon="solar:users-group-rounded-bold" />}>
        {fShortenNumber(item.totalStudents)}
      </Label>
    </Box>
  );

  const renderFooter = (
    <Box
      sx={{
        mt: 2.5,
        gap: 0.5,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box component="span" sx={{ typography: 'h6' }}>
        {fCurrency(item.price)}
      </Box>
      <Box component="span" sx={{ typography: 'body2', color: 'text.secondary', flexGrow: 1 }}>
        / year
      </Box>
      <Button variant="contained" size="small">
        Join
      </Button>
    </Box>
  );

  return (
    <Card sx={{ width: 1 }} {...other}>
      {renderImage}
      
        <Typography  sx={{ px: 2, py: 2.5 }} variant="subtitle1">{item.title}</Typography>
    </Card>
  );
}
