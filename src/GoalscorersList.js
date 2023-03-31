import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container,  Input,  Label,  Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const GoalscorersList = () => {

  const [goalscorers, setGoalscorers] = useState([]);
  const [loading, setLoading] = useState(false);
  var game;
  var player;
  function findByGame(){
    game = document.getElementById("game").value;
    window.location = "/gamegoalscorers/"+ game;
  }
  function findByPlayer(){
    player = document.getElementById("player").value;
    window.location = "/playergoals/"+ player;
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

  const remove = async (game, player) => {
    await fetch(`/goalscorers/delete/${game}/${player}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGoalscorers = [...goalscorers].filter(i => i.game.gameId !== game || i.player.playerId !== player);
      setGoalscorers(updatedGoalscorers);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  
  const goalscorersList = goalscorers.map(goalscorer => {
    const id = `${goalscorer.game.gameId}-${goalscorer.player.playerId}`;
    
    return <tr key={id}>
      <td>  {goalscorer.game.homeTeam.teamName}</td>
      <td>  {goalscorer.game.homeTeamGoals}</td>
      <td>  {goalscorer.game.awayTeamGoals}</td>
      <td>  {goalscorer.game.awayTeam.teamName}</td>
      <td>  {goalscorer.player.name}</td>
      <td>  {goalscorer.player.team.teamName}</td>
      <td>  {goalscorer.goals} goals</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/goalscorers/" + goalscorer.game.gameId + "/" +goalscorer.player.playerId}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(goalscorer.game.gameId,goalscorer.player.playerId)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
      
      

        <div className="float-end">
          <Button color="success" tag={Link} to="/goalscorers/add">Add goalscorers</Button>
        </div>
        <h3>Goalscorers</h3>
        <table>
        <thead>
          <tr>
            <th width ="25%">
              Find all goalscorers in GAME:
            </th>
            <th width ="30%">
            <Label for="game">Game</Label>
            <Input type="text"  name="game" id="game" value={game}  autoComplete="game"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findByGame}>Find</Button>
          </th>
          </tr>
          <tr>
            <th width ="25%">
              Find all games where PLAYER scored:
            </th>
            <th width ="30%">
            <Label for="player">Player</Label>
            <Input type="text"  name="player" id="player" value={player}  autoComplete="player"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findByPlayer}>Find</Button>
          </th>
          

          </tr>
        </thead>
        </table>
      
      
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Home team</th>
            <th width="5%">Home team goals</th>
            <th width="5%">Away team goals</th>
            <th width="20%">Away team</th>
            <th width="20%">Player</th>
            <th width="20%">Player's team</th>
            <th width="10%">Player scored:</th>
          </tr>
          </thead>
          <tbody>
          {goalscorersList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default GoalscorersList;
