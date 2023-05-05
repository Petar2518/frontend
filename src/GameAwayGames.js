import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useParams } from 'react-router-dom';

const GameAwayGames = () => {

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const {team} = useParams();

  useEffect(() => {
    setLoading(true);

    fetch('/games')
      .then(response => response.json())
      .then(data => {
        setGames(data.filter(i=>i.awayTeam.teamId==team));
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/games/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGames = [...games].filter(i => i.gameId !== id);
      setGames(updatedGames);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const gameList = games.map(game => {
    const homeTeam = `${game.homeTeam.teamName || ''}`;
    const awayTeam = `${game.awayTeam.teamName || ''}`;
    return <tr key={game.gameId}>
      <td>{homeTeam}</td>
      <td>{game.homeTeamGoals}</td>
      <td>{game.awayTeamGoals}</td>
      <td>{awayTeam}</td>
      <td>{game.league.leagueName}</td>
      <td>
        <ButtonGroup>
        <Button size="sm" color="secondary" tag={Link} to={"/games/view/" + game.gameId}>View Game</Button>
          <Button size="sm" color="primary" tag={Link} to={"/games/" + game.gameId}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(game.gameId)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/games/add">Add Games</Button>
        </div>
        <h3>Games</h3>
        <Table className="mt-4">
          <thead>
          <tr>
          <th width="25%">Home Team</th>
            <th width="5%">Home Team Goals</th>
            <th width="5%">Away Team Goals</th>
            <th width="25%">Away Team</th>
            <th width="40%">League</th>
          </tr>
          </thead>
          <tbody>
          {gameList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default GameAwayGames;
