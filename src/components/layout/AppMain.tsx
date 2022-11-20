import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import AppTopBar from './AppTopBar';
import AppDrawer from './AppDrawer';
import AppContent from './AppContent';


function AppMain() {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex'}}>
      <BrowserRouter>
        <CssBaseline />
        <AppTopBar />
        <AppDrawer drawerWidth={drawerWidth} />
        <AppContent />
      </BrowserRouter>
    </Box>
  );
}

export default AppMain;
