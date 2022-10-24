import React from 'react';
import BubbleSort from '../algorithms/BubbleSort';
import { Route, Routes } from 'react-router-dom';
import BinaryTree from '../algorithms/BinaryTree';
import { Box } from '@mui/material';
import BinarySearch from '../algorithms/BinarySearch';
import BinarySearchTree from '../algorithms/BinarySearchTree';

function Algotrithms() {
  return (
    <Box>
      <Routes>
        <Route path="bubblesort" element={<BubbleSort />} />
        <Route path="binarytree" element={<BinaryTree />} />
        <Route path="binarysearch" element={<BinarySearch />} />
        <Route path="binarysearchtree" element={<BinarySearchTree />} />
      </Routes>
    </Box>
  );
}
export default Algotrithms;
