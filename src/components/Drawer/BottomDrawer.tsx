import React, { ReactNode } from 'react';
// import Drawer from '@mui/material/Drawer';
// import { Box } from '@mui/material';

interface BottomDrawerProps {
  children: ReactNode;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ children}) => {
  return (
    <div className='fixed bottom-0 w-full'>
      {children}
      {/* <Drawer anchor={'bottom'} open={open} onClose={handleClose} >
        <Box sx={{
          width: '200px',
        }} >
          {children}
        </Box>
      </Drawer> */}
    </div>
  );
}

export default BottomDrawer;
