import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import myApi from './api/myApi'
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
const PlayerEdit = () => {
  const initialFormState = {
    name: '',
    position: '',
    team: '',
    age: 0,
  };
  const options = [
    { value: 'goalkeeper', label: 'Goalkeeper'},
    { value: 'defender', label: 'Defender'},
    { value: 'midfielder', label: 'Midfielder'},
    { value: 'forward', label: 'Forward'},
  ]
  const [player, setPlayer] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [disabled, setDisabled] = useState(null)

  const fetchTeams = async () => {
    const result = await myApi.get('/teams');
    const res = result.data;
    return res;
  }
  useEffect(() => {
    if (id !== 'add') {
      setDisabled(true);
      fetch(`player/${id}`)
        .then(response => response.json())
        .then(data => setPlayer(data));
        
    }
  }, [id, setPlayer]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setPlayer({ ...player, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log (player.position);
    console.log(player);
    await fetch(`/players/player${player.playerId ? `/${player.playerId}` : '/add'}`, {
      
      method: (player.playerId) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(player)
    });
    console.log(`/players/player${player.playerId ? `/${player.playerId}` : '/add'}`);
    setPlayer(initialFormState);
    navigate('/players');
  }

  const title = <h2>{player.playerId ? 'Edit player' : 'Add player'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input disabled={disabled} type="text" name="name" id="name" value={player.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="position">Position</Label>
            <Select 
            name="position"
            id="position"
            isSearchable={false}
            defaultValue={player.position}
            value={options.value}
            getOptionLabel={e=> e.label}
            getOptionValue={e=> e.value}
            onChange={option=>handleChange({target:{value: option.value, name:'position'}})}
            options={options}/>
          </FormGroup>
          <FormGroup>
            <Label for="team">Team</Label>
                   <AsyncSelect
          name="team"
          id="team"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={player.team}
          getOptionLabel={e => e.teamName + ', ' + e.city + ', ' + e.country }
          getOptionValue={e => e.teamId}
          loadOptions={fetchTeams}
          onChange={team=>handleChange({target:{value: team, name:'team'}})}
        />
          </FormGroup>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input type="text" name="age" id="age" value={player.age || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/players">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default PlayerEdit;
