import Home from '../pages/Home';
import { Box, Toolbar } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Algotrithms from '../pages/Algorithms';
import Maps from '../pages/Maps';

function AppContent() {
    return (
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            <Toolbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="algorithms/*" element={<Algotrithms />} />
                <Route path="maps" element={<Maps />} />
            </Routes>
        </Box>
    );
}

export default AppContent;
