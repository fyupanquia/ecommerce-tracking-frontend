import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

export default function LinearIndeterminate() {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
      <CircularProgress disableShrink color="inherit" />
    </Grid>
  );
}