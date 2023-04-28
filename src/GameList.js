import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Input, Label, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const GameList = () => {

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  var team;
  function findHomeGames(){
    team = document.getElementById("team").value;
    window.location = "/homegames/"+ team;
  }
  function findAwayGames(){
    team = document.getElementById("team").value;
    window.location = "/awaygames/"+ team;
  }
  function findAllGames(){
    team = document.getElementById("team").value;
    window.location = "/allgames/"+ team;
  }

  useEffect(() => {
    setLoading(true);

    fetch('/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
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
        <table>
        <thead>
          <tr>
            <th width ="25%">
              Home/Away/All games for TEAM:
            </th>
            <th width ="30%">
            <Label for="team">Team</Label>
            <Input type="text" name="team" id="team" value={team}  autoComplete="team"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findHomeGames}>Home games</Button>
            </th>
            <th width="5%"> 
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findAwayGames}>Away games</Button>
            </th>
            <th width="5%"> 
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findAllGames}>All games</Button>
            </th>
          </tr>
        </thead>
        </table>
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

export default GameList;
