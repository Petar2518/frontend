import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Input, Label, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import myApi from './api/myApi';
import AsyncSelect from 'react-select/async';

const PlayerList = () => {

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  var age ;
  const[disabled,setDisabled]=useState(true);
  var team;
  function youngerThan(){
    age = document.getElementById("age").value;
    window.location = "/youngerthan/"+ age;
  }
  function olderThan(){
    age = document.getElementById("age").value;
    window.location = "/olderthan/"+ age;
  }
  function findByTeam(){
    team = document.getElementById("team").value;
    window.location = "/"+players.team.teamId+"/players";
  }
  const fetchTeams = async () => {
    const result = await myApi.get('/teams');
    const res = result.data;
    return res;
  }
  const handleChange = (event) => {
    const { name, value } = event.target

    setPlayers({ ...players, [name]: value })
  }
  const handleDisabled = (event) =>{
    event.preventDefault();
    setDisabled(false);
  }
  useEffect(() => {
    setLoading(true);

    fetch('/players')
      .then(response => response.json())
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/players/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedPlayers = [...players].filter(i => i.playerId !== id);
      setPlayers(updatedPlayers);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/players/add">Add Player</Button>
        </div>
        <h3>Players</h3>
        <table>
        <thead>
          <tr>
            <th width ="25%">
              Younger/older than:
            </th>
            <th width ="30%">
            <Input type="text" onChange={handleDisabled} width="2" name="age" id="age" value={age}  autoComplete="age"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary"  disabled={disabled} onClick={youngerThan}>Younger than</Button>
            </th>
            <th width="5%"> 
            </th>
            <th width="15%">
            <Button color="secondary" disabled={disabled}  onClick={olderThan}>Older than</Button>
            </th>
          </tr>
        </thead>
        </table>
        <table>
        <thead>
          <tr>
            <th width ="25%">
              Find players in TEAM:
            </th>
            <th width ="30%">
            <AsyncSelect
          name="team"
          id="team"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={players.team}
          getOptionLabel={e => e.teamName }
          getOptionValue={e => e.teamId}
          loadOptions={fetchTeams}
          onChange={t=>handleChange({target:{value: t, name:'team'}})}
        />       
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findByTeam} disabled={!players.team}>Find</Button>
            
            </th>
          </tr>
        </thead>
        </table>
       
      </Container>
    </div>
  );
};

export default PlayerList;
