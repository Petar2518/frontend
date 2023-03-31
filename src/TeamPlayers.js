import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container,  Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useParams } from 'react-router-dom';

const PlayerList = () => {

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {team} = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`/players`)

      .then(response => response.json())
      .then(data => {
        setPlayers(data.filter(i=> i.team.teamName===team));
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
