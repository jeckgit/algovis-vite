import { Box, CssBaseline, Snackbar, Alert } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import AppTopBar from './AppTopBar';
import AppDrawer from './AppDrawer';
import AppContent from './AppContent';


function AppMain() {
  const drawerWidth = 240;
  const snackbarMessage = "hi"

  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <BrowserRouter>
        <CssBaseline />
        <AppTopBar />
        <AppDrawer drawerWidth={drawerWidth} />
        <AppContent />
      </BrowserRouter>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={6000}>
      <Alert severity="success" sx={{ width: '100%' }}>
        { snackbarMessage }
      </Alert>
    </Snackbar>
      

    </Box>
  );
}

export default AppMain;
