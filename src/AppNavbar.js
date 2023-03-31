import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <NavbarBrand tag={Link} to="/players">Players</NavbarBrand>
      <NavbarBrand tag={Link} to="/teams">Teams</NavbarBrand>
      <NavbarBrand tag={Link} to="/games">Games</NavbarBrand>
      <NavbarBrand tag={Link} to="/leagues">Leagues</NavbarBrand>
      <NavbarBrand tag={Link} to="/goalscorers">Goalscorers</NavbarBrand>
      <NavbarBrand tag={Link} to="/participants">Participants</NavbarBrand>
      <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="justify-content-end" style={{width: "100%"}} navbar>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AppNavbar;
