import React from 'react';
import {
  Nav,
  NavLink,
} from './NavbarElements';

import { Outlet } from "react-router-dom";
  
const Navbar = () => {
  return (
    <>
    <h1 className='heading'> Population Insights </h1>
      <Nav>
        <NavLink to='/bar'>
          Histogram
        </NavLink>
        <NavLink to='/table'>
          Table
        </NavLink>
        <NavLink to='/pie'>
          Pie Chart
        </NavLink>
      </Nav>

      <Outlet />
    </>
  );
};
  
export default Navbar;