import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import myApi from './api/myApi'
import AsyncSelect from 'react-select/async';

const GameList = () => {

  const [games, setGames] = useState([]);
  const [game,setGame] = useState([]);
  const [loading, setLoading] = useState(false);
  function findHomeGames(){
    window.location = "/homegames/"+ game.team.teamId;
  }
  function findAwayGames(){
    window.location = "/awaygames/"+ game.team.teamId;
  }
  function findAllGames(){
    window.location = "/allgames/"+ game.team.teamId;
  }
  const fetchTeams = async () => {
    const result = await myApi.get('/teams');
    const res = result.data;
    return res;
  }
  const handleChange = (event) => {
    const { name, value } = event.target

    setGame({ ...game, [name]: value })
  }

  useEffect(() => {
    setLoading(true);

    fetch('/games')
      .then(response => response.json())
      .then(data => {
        const sort = data.sort((a,b)=>b.gameId-a.gameId)
        setGames(sort);
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
        <table>
        <thead>
          <tr>
            <th width ="25%">
              Home/Away/All games for TEAM:
            </th>
            <th width ="30%">
          <AsyncSelect
          name="team"
          id="team"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={game.team}
          getOptionLabel={e => e.teamName + ', ' + e.city + ', ' + e.country }
          getOptionValue={e => e.teamId}
          loadOptions={fetchTeams}
          onChange={team=>handleChange({target:{value: team, name:'team'}})}
        />
            </th>
            <th width="7%">
            </th>
            <th width="10%">
            <Button color="secondary" disabled={!game.team} onClick={findHomeGames}>Home games</Button>
            </th>
            <th width="5%"> 
            </th>
            <th width="10%">
            <Button color="secondary"  disabled={!game.team} onClick={findAwayGames}>Away games</Button>
            </th>
            <th width="5%"> 
            </th>
            <th width="10%">
            <Button color="secondary" disabled={!game.team} onClick={findAllGames}>All games</Button>
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
            <th width="27%">League</th>
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
