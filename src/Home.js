import React from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

const Home = () => {
  return (
    <div>
      <AppNavbar/>
      <Container fluid>
      <Button color="success" tag={Link} to="/players">Manage Player</Button>
      <Button color="success" tag={Link} to="/teams">Manage Team</Button>
      <Button color="success" tag={Link} to="/games">Manage Game</Button>
      <Button color="success" tag={Link} to="/leagues">Manage League</Button>
      <Button color="success" tag={Link} to="/goalscorers">Manage Goalscorers</Button>
      <Button color="success" tag={Link} to="/participants">Manage Participants in Leagues</Button>
      </Container>
    </div>
  );
}
export default Home;
