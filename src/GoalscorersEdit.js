import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import myApi from './api/myApi'
import AsyncSelect from 'react-select/async';

const GoalscorersEdit = () => {
  const initialFormState = {
    game : 0,
    player: 0,
    goals: 0,
    team: 0,
  };
  
  const [goalscorer, setGoalscorer] = useState(initialFormState);
  const navigate = useNavigate();
  const { game, player } = useParams();
  const [disabled, setDisabled] = useState(null)

  const fetchGames = async () => {
    const result = await myApi.get('/games');
    const res = result.data;
    return res;
  }
  const fetchPlayers = async () => {
    const result = await myApi.get('/players');
    const res = result.data;
    return res;
  }
  useEffect(() => {
    if (game !== 'add' && player !== 'add') {
      setDisabled(true);
      fetch(`${player}`)
        .then(response => response.json())
        .then(data => setGoalscorer(data));
    }
  }, [game,player, setGoalscorer]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setGoalscorer({ ...goalscorer, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await fetch(`/goalscorers/goalscorer${player ? `/${goalscorer.game.gameId}/${goalscorer.player.playerId}` : '/add'}`, {
        
        
      method: (game!=='add') ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goalscorer)
    });
    console.log(`/goalscorers/goalscorer${player ? `/${goalscorer.game.gameId}/${goalscorer.player.playerId}` : '/add'}`);
    setGoalscorer(initialFormState);
    navigate('/goalscorers');
  }

  const title = <h2>{game!=='add' ? 'Edit goalscorer' : 'Add goalscorer'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="game">Game</Label>
                   <AsyncSelect
          isDisabled={disabled}
          name="game"
          id="game"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={goalscorer.game}
          getOptionLabel={e => e.homeTeam.teamName + ' ' + e.homeTeamGoals + ' : ' + e.awayTeamGoals + ' ' + e.awayTeam.teamName  }
          getOptionValue={e => e.gameId}
          loadOptions={fetchGames}
          onChange={team=>handleChange({target:{value: team, name:'game'}})}
        />
          </FormGroup>
          <FormGroup>
            <Label for="player">Player</Label>
            <AsyncSelect
          isDisabled={disabled}
          name="player"
          id="player"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={goalscorer.player}
          getOptionLabel={e => e.name + ', team:' + e.team.teamName }
          getOptionValue={e => e.playerId}
          loadOptions={fetchPlayers}
          onChange={player=>handleChange({target:{value: player, name:'player'}})}
        />
          </FormGroup>
          <FormGroup>
            <Label for="goals">Goals</Label>
            <Input type="text" name="goals" id="goals" value={goalscorer.goals || ''}
                   onChange={handleChange} autoComplete="goals"/>  
          </FormGroup>
        
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/goalscorers">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default GoalscorersEdit;
