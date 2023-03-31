import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const PlayerEdit = () => {
  const initialFormState = {
    name: '',
    position: 'midfielder',
    team: 'Barcelona',
    age: 0,
  };
  const [player, setPlayer] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'add') {
      fetch(`player/${id}`)
        .then(response => response.json())
        .then(data => setPlayer(data));
    }
  }, [id, setPlayer]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setPlayer({ ...player, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/players/player${player.playerId ? `/${player.playerId}` : '/add'}`, {
      
      method: (player.playerId) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(player)
    });
    console.log(`/players/player${player.playerId ? `/${player.playerId}` : '/add'}`);
    setPlayer(initialFormState);
    navigate('/players');
  }

  const title = <h2>{player.playerId ? 'Edit player' : 'Add player'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={player.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="position">Position</Label>
            <Input type="text" name="position" id="position" value={player.position || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="team">Team</Label>
            <Input type="text" name="team" id="team" value={player.team.teamName }
                   onChange={handleChange} autoComplete="teamName"/>  
          </FormGroup>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input type="text" name="age" id="age" value={player.age || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/players">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default PlayerEdit;
