import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const TeamEdit = () => {
  const initialFormState = {
    teamName: '',
    country: '',
    city: '',
  };
  const [team, setTeam] = useState(initialFormState);
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    if (name !== 'add') {
      fetch(`team/${name}`)
        .then(response => response.json())
        .then(data => setTeam(data));
    }
  }, [name, setTeam]);

  const handleChange = (event) => {
    const { name, value } = event.target
    setTeam({ ...team, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/teams/team${team.teamName ? `/${team.teamName}` : '/add'}`, {
     
      method: (name!=='add') ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(team)
    });
    console.log((name!=='add') ? 'PUT' : 'POST');
    console.log(`/teams/team${team.teamName ? `/${team.teamName}` : '/add'}`);
    setTeam(initialFormState);
    navigate('/teams');
  }

  const title = <h2>{name!=='add' ? 'Edit team' : 'Add team'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="teamName">Name</Label>
            <Input type="text" name="teamName" id="teamName" value={team.teamName || ''}
                   onChange={handleChange} autoComplete="teamName"/>
          </FormGroup>
          <FormGroup>
            <Label for="country">country</Label>
            <Input type="text" name="country" id="country" value={team.country || ''}
                   onChange={handleChange} autoComplete="country"/>
          </FormGroup>
          <FormGroup>
            <Label for="city">city</Label>
            <Input type="text" name="city" id="city" value={team.city }
                   onChange={handleChange} autoComplete="city"/>  
          </FormGroup>
          
          
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/teams">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default TeamEdit;