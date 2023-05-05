import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import myApi from './api/myApi'
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
const AddPlayerToTeam = () => {
  const initialFormState = {
    name: '',
    position: '',
    team: '',
    age: 0,
  };
  const options = [
    { value: 'goalkeeper', label: 'goalkeeper'},
    { value: 'defender', label: 'defender'},
    { value: 'midfielder', label: 'midfielder'},
    { value: 'forward', label: 'forward'},
  ]
  const [teams,setTeams] = useState(null);
  const [player, setPlayer] = useState(initialFormState);
  const navigate = useNavigate();
  const { team } = useParams();
  const [disabled, setDisabled] = useState(null)

  const fetchTeams = async () => {
    const result = await myApi.get('/teams');
    const res = result.data;
    return res;
  }
  useEffect(() => {
    if(team)
    {
        setDisabled(true);
        fetch(`/teams/team/${team}`)
        .then(response => response.json())
        .then(data => setTeams(data));
        
    }
  }, [team, setTeams],player.team=teams,  options.label=player.position);

  const handleChange = (event) => {
    const { name, value } = event.target

    setPlayer({ ...player, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/players/player${player.playerId ? `/${player.playerId}` : '/add'}`, {
      
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(player)
    });
    setPlayer(initialFormState);
    navigate('/'+team+'/players');
  }

  const title = <h2>{'Add player'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input  type="text" name="name" id="name" value={player.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="position">Position</Label>
            <Select 
            name="position"
            id="position"
            isSearchable={false}
            defaultValue={options.label}
            value={options.value}
            placeholder={options.label}
            getOptionLabel={e=> e.label}
            getOptionValue={e=> e.value}
            onChange={option=>handleChange({target:{value: option.value, name:'position'}})}
            options={options}/>
          </FormGroup>
          <FormGroup>
            <Label for="team">Team</Label>
                   <AsyncSelect
            isDisabled={disabled}
          name="team"
          id="team"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={player.team}
          getOptionLabel={e => e.teamName + ', ' + e.city + ', ' + e.country }
          getOptionValue={e => e.teamId}
          loadOptions={fetchTeams}
          onChange={t=>handleChange({target:{value: t, name:'team'}})}
        />
          </FormGroup>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input type="text" name="age" id="age" value={player.age || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to={"/"+team+"/players"}>Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default AddPlayerToTeam;
