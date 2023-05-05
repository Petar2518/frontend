import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container,  Input,  Label,  Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import myApi from './api/myApi'
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

const GoalscorersList = () => {

  const [goalscorers, setGoalscorers] = useState([]);
  const [loading, setLoading] = useState(false);
  var game;
  var player;
  function findByGame(){
    game = document.getElementById("game").value;
    window.location = "/games/view/"+ goalscorers.game.gameId;
  }
  function findByPlayer(){
    player = document.getElementById("player").value;
    window.location = "/playergoals/"+ goalscorers.player.playerId;
  }
  const fetchGames = async () => {
    const result = await myApi.get('/games');
    const res = result.data;
    return res;
  }
  const fetchPlayers = async () => {
    const result = await myApi.get('/players');
    const res = result.data;
    return res;
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setGoalscorers({ ...goalscorers, [name]: value })
  }
  useEffect(() => {
    setLoading(true);

    fetch('/goalscorers')
      .then(response => response.json())
      .then(data => {
        setGoalscorers(data);
        setLoading(false);
      })
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <h3>Goalscorers</h3>
        <table>
        <thead>
          <tr>
            <th width ="25%">
              Show all goalscorers in GAME:
            </th>
            <th width ="30%">
            <AsyncSelect
          name="game"
          id="game"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={goalscorers.game}
          getOptionLabel={e => e.homeTeam.teamName + ' ' + e.homeTeamGoals + ' : ' + e.awayTeamGoals + ' ' + e.awayTeam.teamName  }
          getOptionValue={e => e.gameId}
          loadOptions={fetchGames}
          onChange={team=>handleChange({target:{value: team, name:'game'}})}
        />       
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" disabled={!goalscorers.game} onClick={findByGame}>Find</Button>
          </th>
          </tr>
          <tr>
            <th width ="25%">
              Show all games where PLAYER scored:
            </th>
            <th width ="30%">
            <AsyncSelect
          name="player"
          id="player"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={goalscorers.player}
          getOptionLabel={e => e.name + ', team:' + e.team.teamName }
          getOptionValue={e => e.playerId}
          loadOptions={fetchPlayers}
          onChange={player=>handleChange({target:{value: player, name:'player'}})}
        />
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" disabled={!goalscorers.player} onClick={findByPlayer}>Find</Button>
          </th>
          </tr>
        </thead>
        </table>
      </Container>
    </div>
  );
};

export default GoalscorersList;
