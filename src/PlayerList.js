import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Input, Label, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const PlayerList = () => {

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  var age ;
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
    window.location = "/"+team+"/players";
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

  const playerList = players.map(player => {
    const team = `${player.team.teamName || ''}`;
    return <tr key={player.playerId}>
      <td style={{whiteSpace: 'nowrap'}}>{player.name}</td>
      <td>{team}</td>
      <td>{player.position}</td>
      <td>{player.age}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/players/" + player.playerId}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(player.playerId)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

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
            <Label for="age">Age</Label>
            <Input type="text" width="2" name="age" id="age" value={age}  autoComplete="age"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={youngerThan}>Younger than</Button>
            </th>
            <th width="5%"> 
            </th>
            <th width="15%">
            <Button color="secondary" onClick={olderThan}>Older than</Button>
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
            <Label for="age">Team</Label>
            <Input type="text" width="2" name="team" id="team" value={team}  autoComplete="team"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findByTeam}>Find</Button>
            </th>
          </tr>
        </thead>
        </table>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Name</th>
            <th width="20%">Team</th>
            <th>Position</th>
            <th width="10%">Age</th>
          </tr>
          </thead>
          <tbody>
          {playerList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default PlayerList;
