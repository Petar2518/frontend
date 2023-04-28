import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const GameEdit = () => {
  const initialFormState = {
    homeTeam: '',
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    awayTeam: '',
    league: ''
  };
  const [game, setGame] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'add') {
      fetch(`game/${id}`)
        .then(response => response.json())
        .then(data => setGame(data));
    }
  }, [id, setGame]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setGame({ ...game, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/games/game${game.gameId ? `/${game.gameId}` : '/add'}`, {
      
      method: (game.gameId) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game)
    });
    console.log(`/games/game${game.gameId ? `/${game.gameId}` : '/add'}`);
    setGame(initialFormState);
    navigate('/games');
  }

  const title = <h2>{game.gameId ? 'Edit game' : 'Add game'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="homeTeam">Home team</Label>
            <Input type="text" name="homeTeam" id="homeTeam" value={game.homeTeam.teamName }
                   onChange={handleChange} autoComplete="homeTeam"/>
          </FormGroup>
          <FormGroup>
            <Label for="homeTeamGoals">Home team goals</Label>
            <Input type="text" name="homeTeamGoals" id="homeTeamGoals" value={game.homeTeamGoals || ''}
                   onChange={handleChange} autoComplete="homeTeamGoals"/>
          </FormGroup>
          <FormGroup>
            <Label for="awayTeamGoals">Away team goals</Label>
            <Input type="text" name="awayTeamGoals" id="awayTeamGoals" value={game.awayTeamGoals || ''}
                   onChange={handleChange} autoComplete="awayTeamGoals"/>  
          </FormGroup>
          <FormGroup>
            <Label for="awayTeam">Away team</Label>
            <Input type="text" name="awayTeam" id="awayTeam" value={game.awayTeam.teamName }
                   onChange={handleChange} autoComplete="awayTeam"/>
          </FormGroup>
          <FormGroup>
            <Label for="league">League</Label>
            <Input type="text" name="league" id="league" value={game.league.leagueId }
                   onChange={handleChange} autoComplete="league"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/games">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default GameEdit;
