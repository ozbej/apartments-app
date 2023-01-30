import React from "react";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import icon from '../assets/house-icon.png';
import '../styles/header.css'

function Header() {
  return (
    <>
    <div className="header-container">
      <img src={icon} className="header-icon" alt="Icon" />
      <Typography variant="h5" component="div" sx={{ml: 2}}>
          Apartments App
        </Typography>
    </div>
    <Divider />
    </>
  );
}

export default Header;