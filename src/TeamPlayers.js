import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container,  Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useParams } from 'react-router-dom';

const TeamPlayers = () => {

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {team} = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`/players`)

      .then(response => response.json())
      .then(data => {
        setPlayers(data.filter(i=> i.team.teamId==team));
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
 let teamname = '';
  const playerList = players.map(player => {
    teamname = player.team.teamName;
    return <tr key={player.playerId}>
      <td style={{whiteSpace: 'nowrap'}}>{player.name}</td>
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
          <Button color="success" tag={Link} to={"/team/" + team + "/player/add"}>Add Player to Squad</Button>
        </div>
        <h3>{teamname}'s squad</h3>
        
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="40%">Name</th>
            <th width= "35%">Position</th>
            <th width="20%">Age</th>
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

export default TeamPlayers;
