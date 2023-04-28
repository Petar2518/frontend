import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container,  Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useParams } from 'react-router-dom';

const GoalscorersList = () => {

  const [goalscorers, setGoalscorers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {player} = useParams();
  

  useEffect(() => {
    setLoading(true);

    fetch('/goalscorers')
      .then(response => response.json())
      .then(data => {
        setGoalscorers(data.filter(i=>i.player.playerId==player));
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
    // const id = `${goalscorers.game.gameId + goalscorers.player.playerId}`;
    const id = `${goalscorer.game.gameId}-${goalscorer.player.playerId}`;
    
    return <tr key={id}>
      <td>  {goalscorer.game.homeTeam.teamName}</td>
      <td>  {goalscorer.game.homeTeamGoals}</td>
      <td>  {goalscorer.game.awayTeamGoals}</td>
      <td>  {goalscorer.game.awayTeam.teamName}</td>
      <td>  {goalscorer.player.name}</td>
      <td>  {goalscorer.team.teamName}</td>
      <td>  {goalscorer.goals} goals</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/goalscorers/" + goalscorer.game.gameId + "/" +goalscorer.player.playerId}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(goalscorers.game.gameId,goalscorers.player.playerId)}>Delete</Button>
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
