import React, {useState, MouseEvent} from 'react';
import {Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom"

const NavBar = () => {

   return (
       <Navbar className="" bg="primary" variant="dark" expand="sm">
          <Navbar.Text className="mx-4">
             <NavLink to="/">ProductStore</NavLink>
          </Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
       </Navbar>
   );
};

export default NavBar;
