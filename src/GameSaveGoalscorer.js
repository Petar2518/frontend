import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import myApi from './api/myApi'
import AsyncSelect from 'react-select/async';

const GameSaveGoalscorer = () => {
  const initialFormState = {
    game : 0,
    player: 0,
    goals: 0,
    team: 0,
  };

  const [games,setGames] = useState(null);
  

  const [goalscorer, setGoalscorer] = useState(initialFormState);
  const navigate = useNavigate();
  const { game, player } = useParams();
  const [disabled, setDisabled] = useState(null);

  
  const fetchPlayers = async () => {
    const result = await myApi.get('/players');
    const res = result.data;
    for(let i = 0; i<res.length;i++){
      console.log(res[i].name);
        if(!(res[i].team.teamName==goalscorer.game.homeTeam.teamName || res[i].team.teamName == goalscorer.game.awayTeam.teamName)){
            res.splice(i,1);
            i--;
        }
    }
    return res;
  }
  useEffect(() => {
    if (game){
        setDisabled(true);
        fetch(`/games/game/${game}`)
        .then(response => response.json())
        .then(data => setGames(data));    
    }
  }, [game, setGames],goalscorer.game=games);

  const handleChange = (event) => {
    const { name, value } = event.target

    setGoalscorer({ ...goalscorer, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await fetch(`/goalscorers/goalscorer${player ? `/${goalscorer.game.gameId}/${goalscorer.player.playerId}` : '/add'}`, {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goalscorer)
    });
    setGoalscorer(initialFormState);
    navigate('/games/view/' + game);
  }

  const title = <h2>{'Add goalscorer'}</h2>;

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
          onChange={team=>handleChange({target:{value: team, name:'game'}})}
        />
          </FormGroup>
          <FormGroup>
            <Label for="player">Player</Label>
            <AsyncSelect
        
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

export default GameSaveGoalscorer;
