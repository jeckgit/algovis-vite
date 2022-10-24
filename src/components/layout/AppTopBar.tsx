import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import React from 'react';

function AppTopBar() {
  const navigate = useNavigate();
  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'white',
        color: '#333',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)'
      }}
    >
      <Toolbar>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate('/')}>
          <CodeIcon />
        </Button>
        <Typography variant="h6" noWrap component="div">
          AlgoVis
        </Typography>
      </Toolbar>
    </AppBar >
  );
}
export default AppTopBar;
