import React, { ReactNode } from 'react';
// import Drawer from '@mui/material/Drawer';
// import { Box } from '@mui/material';

interface BottomDrawerProps {
  children: ReactNode;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ children}) => {
  return (
    <div className='w-full'>
      {children}
    </div>
  );
}

export default BottomDrawer;
