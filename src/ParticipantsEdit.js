import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const ParticipantsEdit = () => {
  const initialFormState = {
    league : 0,
    team: '',
    points: 0,
  };
  const [participant, setParticipant] = useState(initialFormState);
  const navigate = useNavigate();
  const { league, team } = useParams();


  useEffect(() => {
    if (league !== 'add' && team !== 'add') {
      fetch(`${team}`)
        .then(response => response.json())
        .then(data => setParticipant(data));
    }
  }, [league,team, setParticipant]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setParticipant({ ...participant, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await fetch(`/participants/participant${team ? `/${participant.league.leagueId}/${participant.team.teamId}` : '/add'}`, {
        
        
      method: (league!=='add') ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(participant)
    });
    console.log(`/participants/participant${team ? `/${participant.league.leagueId}/${participant.team.teamId}` : '/add'}`);
    setParticipant(initialFormState);
    navigate('/participants');
  }

  const title = <h2>{league!=='add' ? 'Edit participant' : 'Add participant'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="league">League</Label>
            <Input type="text" name="league" id="league" value={participant.league.leagueId }
                   onChange={handleChange} autoComplete="league"/>
          </FormGroup>
          <FormGroup>
            <Label for="team">Team</Label>
            <Input type="text" name="team" id="team" value={participant.team.teamId }
                   onChange={handleChange} autoComplete="team"/>
          </FormGroup>
          <FormGroup>
            <Label for="points">Points</Label>
            <Input type="text" name="points" id="points" value={participant.points || ''}
                   onChange={handleChange} autoComplete="points"/>  
          </FormGroup>
          
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/participants">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default ParticipantsEdit;
