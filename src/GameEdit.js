import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import myApi from './api/myApi'
import AsyncSelect from 'react-select/async';
const GameEdit = () => {
  const initialFormState = {
    homeTeam: '',
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    awayTeam: '',
    league: '',
  };
   
  const [game, setGame] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [disabled, setDisabled] = useState(null)

  const fetchTeams = async () => {
    const result = await myApi.get('/teams');
    const res = result.data;
    return res;
  }
  const fetchLeagues = async () => {
    const result = await myApi.get('/leagues');
    const res = result.data;
    return res;
  }


  useEffect(() => {
    if (id !== 'add') {
      setDisabled(true);
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
    setGame(initialFormState);
    navigate('/games/');
  }

  const title = <h2>{game.gameId ? 'Edit game' : 'Add game'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
          <Label for="homeTeam" >Home team</Label>
         
          <AsyncSelect
          isDisabled={disabled}
          name="homeTeam"
          id="homeTeam"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={game.homeTeam}
          getOptionLabel={e => e.teamName + ', ' + e.city + ', ' + e.country }
          getOptionValue={e => e.teamId}
          loadOptions={fetchTeams}
          onChange={team=>handleChange({target:{value: team, name:'homeTeam'}})}
        />

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
           
          
          <AsyncSelect
          isDisabled={disabled}
          name="awayTeam"
          id="awayTeam"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={game.awayTeam}
          getOptionLabel={e => e.teamName + ', ' + e.city + ', ' + e.country }
          getOptionValue={e => e.teamId}
          loadOptions={fetchTeams}
          onChange={team=>handleChange({target:{value: team, name:'awayTeam'}})}
        />
          </FormGroup>
          <FormGroup>
            <Label for="league">League</Label>
            <AsyncSelect
          isDisabled={disabled}
          name="league"
          id="league"
          cacheOptions
          isSearchable={false}
          defaultOptions
          value={game.league}
          getOptionLabel={e => e.leagueName + ' ' +e.season}
          getOptionValue={e => e.leagueId}
          loadOptions={fetchLeagues}
          onChange={leagues=>handleChange({target:{value: leagues, name:'league'}})}
        />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to={`/games/${game.gameId ? `view/${game.gameId}` : ''}`}>Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default GameEdit;
