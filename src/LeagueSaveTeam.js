import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import myApi from './api/myApi'
import AsyncSelect from 'react-select/async';
const LeagueSaveTeam = () => {
  const initialFormState = {
    league : 0,
    team: '',
    points: 0,
  };
  const [leagues, setLeagues]= useState(null);
  const [participant, setParticipant] = useState(initialFormState);
  const navigate = useNavigate();
  const { league, team } = useParams();
  const [disabled, setDisabled] = useState(null)

  
  const fetchLeagues = async () => {
    const result = await myApi.get('/leagues');
    const res = result.data;
    return res;
  }
  const fetchTeams = async () => {
    const result = await myApi.get('/teams');
    const res = result.data;
    const result2=await myApi.get('/participants');
    const parti=result2.data;
    for(let i=0;i<parti.length;i++){
      if(parti[i].league.leagueId==league){
        for(let j=0;j<res.length;j++){
          if (parti[i].team.teamId==res[j].teamId){
            res.splice(j,1);
            j--;
          }
        }
      }
    }
    return res;
  }
  useEffect(() => {
    if (league) {
      setDisabled(true);
      fetch(`/leagues/league/${league}`)
        .then(response => response.json())
        .then(data => setLeagues(data));
    }
  }, [league,setLeagues],participant.league=leagues);

  const handleChange = (event) => {
    const { name, value } = event.target

    setParticipant({ ...participant, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await fetch(`/participants/participant${team ? `/${participant.league.leagueId}/${participant.team.teamId}` : '/add'}`, {
        
        
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(participant)
    });
    setParticipant(initialFormState);
    navigate('/leagueparticipants/' + league);
  }

  const title = <h2>{'Add participant'}</h2>;

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
          isDisabled={disabled}
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

export default LeagueSaveTeam;
