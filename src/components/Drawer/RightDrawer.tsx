import React, { ReactNode } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';

interface RightDrawerProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
}

const RightDrawer: React.FC<RightDrawerProps> = ({ children, open, handleClose }) => {
  return (
    <div>
      <Drawer anchor={'right'} open={open} onClose={handleClose} >
        <Box sx={{
          width: '400px',
        }} >
          {children}
        </Box>
      </Drawer>
    </div>
  );
}

export default RightDrawer;
