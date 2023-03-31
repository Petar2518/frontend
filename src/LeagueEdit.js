import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const LeagueEdit = () => {
  const initialFormState = {
    leagueName: '',
    leagueNation: '',
    leagueDivision: '',

  };
  const [league, setLeague] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'add') {
      fetch(`league/${id}`)
        .then(response => response.json())
        .then(data => setLeague(data));
    }
  }, [id, setLeague]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setLeague({ ...league, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/leagues/league${league.leagueId ? `/${league.leagueId}` : '/add'}`, {
      
      method: (league.leagueId) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(league)
    });
    console.log(`/leagues/league${league.leagueId ? `/${league.leagueId}` : '/add'}`);
    setLeague(initialFormState);
    navigate('/leagues');
  }

  const title = <h2>{league.leagueId ? 'Edit league' : 'Add league'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="leagueName">League name</Label>
            <Input type="text" name="leagueName" id="leagueName" value={league.leagueName || ''}
                   onChange={handleChange} autoComplete="leagueName"/>
          </FormGroup>
          <FormGroup>
            <Label for="leagueNation">League nation</Label>
            <Input type="text" name="leagueNation" id="leagueNation" value={league.leagueNation || ''}
                   onChange={handleChange} autoComplete="leagueNation"/>
          </FormGroup>
          <FormGroup>
            <Label for="leagueDivision">League division</Label>
            <Input type="text" name="leagueDivision" id="leagueDivision" value={league.leagueDivision }
                   onChange={handleChange} autoComplete="leagueDivision"/>  
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/leagues">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default LeagueEdit;
