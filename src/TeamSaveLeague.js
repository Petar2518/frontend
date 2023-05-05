import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import myApi from './api/myApi'
import AsyncSelect from 'react-select/async';
const TeamSaveLeague = () => {
  const initialFormState = {
    league : 0,
    team: '',
    points: 0,
  };
  const [teams, setTeams]= useState(null);
  const [participant, setParticipant] = useState(initialFormState);
  const navigate = useNavigate();
  const { team, league } = useParams();
  const [disabled, setDisabled] = useState(null)
  const fetchTeams = async () => {
    const result = await myApi.get('/teams');
    const res = result.data;

    return res;
  }
  const fetchLeagues = async () => {
    const result = await myApi.get('/leagues');
    const res = result.data;
    const result2=await myApi.get('/participants');
    const parti=result2.data;
    for(let i=0;i<parti.length;i++){
      if(parti[i].team.teamId==team){
        for(let j=0;j<res.length;j++){
          if (parti[i].league.leagueId==res[j].leagueId){
            res.splice(j,1);
            j--;
          }
        }
      }
    }
    return res;
  }
 
 
  useEffect(() => {
    if (team) {
      setDisabled(true);
      fetch(`/teams/team/${team}`)
        .then(response => response.json())
        .then(data => setTeams(data));
    }
  }, [team,setTeams],participant.team=teams);

  const handleChange = (event) => {
    const { name, value } = event.target

    setParticipant({ ...participant, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await fetch(`/participants/participant${league ? `/${participant.league.leagueId}/${participant.team.teamId}` : '/add'}`, {
        
        
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(participant)
    });
    setParticipant(initialFormState);
    navigate('/teamcompetitions/' + team);
  }

  const title = <h2>{'Add competition'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="league">League</Label>
                    <AsyncSelect
          name="league"
          id="league"
          cacheOptions
          isSearchable={false}
          defaultOptions
          value={participant.league}
          getOptionLabel={e => e.leagueName + ' ' +e.season}
          getOptionValue={e => e.leagueId}
          loadOptions={fetchLeagues}
          onChange={leagues=>handleChange({target:{value: leagues, name:'league'}})}
        />
          </FormGroup>
          <FormGroup>
            <Label for="team">Team</Label>
                    <AsyncSelect
          name="team"
          id="team"
          isDisabled={disabled}
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={participant.team}
          getOptionLabel={e => e.teamName + ', ' + e.city + ', ' + e.country }
          getOptionValue={e => e.teamId}
          loadOptions={fetchTeams}
          onChange={team=>handleChange({target:{value: team, name:'team'}})}
        />
          </FormGroup>
          <FormGroup>
            <Label for="points">Points</Label>
            <Input type="text" name="points" id="points" value={participant.points || ''}
                   onChange={handleChange} autoComplete="points"/>  
          </FormGroup>
          
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to={"/teamcompetitions/" + team}>Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default TeamSaveLeague;
