import styles from './myStyle.module.css'; 
import React, { useEffect, useState } from 'react';
import { Button,Container,  Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const GameView = () => {
    let homeTeam ;
    let awayTeam ;
    let homeTeamGoals;
    let awayTeamGoals;
    let league;
  const [goalscorers, setGoalscorers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {game} = useParams();
  const [games,setGames] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('/goalscorers')
      .then(response => response.json())
      .then(data => {
        setGoalscorers(data.filter(i=>i.game.gameId==game));
        setLoading(false);
        
      });
    fetch('/games').then(response=>response.json()).then(data=>{
        setGames(data.filter(i=>i.gameId==game));
    })
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  
  const gameList = games.map(game1 => {
    homeTeam=game1.homeTeam.teamName;
    awayTeam=game1.awayTeam.teamName;
    homeTeamGoals = game1.homeTeamGoals;
    awayTeamGoals = game1.awayTeamGoals;
    league= game1.league.leagueName;
  })

  const goalscorersList = goalscorers.map(goalscorer => {
    const id = `${goalscorer.game.gameId}-${goalscorer.player.playerId}`;
    if(goalscorer.team.teamName == goalscorer.game.homeTeam.teamName){
        return  <tr className={styles.hometeam} key={id}>
        <td >  {goalscorer.goals} goals : {goalscorer.player.name}  </td>
    </tr>
    }else{
        return <tr key={id} className={styles.awayteam}>
        <td > {goalscorer.goals} goals : {goalscorer.player.name}  </td>
    </tr>
    }
  });
  const title = <h2 className={styles.title}>  {league} </h2>
  const score = <h1> {homeTeam} {homeTeamGoals} : {awayTeamGoals} {awayTeam} </h1>

  return (
    
    <div>
      <AppNavbar/>
      <Container fluid > 
      <div className="float-end">
          <Button color="success" tag={Link} to={"/games/" + game}>Edit game</Button> 
          
      </div>
      <div className="float-end">
          <Button color="success" tag={Link} to={"/game/goalscorer/add/" + game}>Add goalscorers</Button> 
          
      </div>
        <div className="float-end">
        <Button  color="primary" tag={Link} to={"/gamegoalscorers/" +game}>Edit Goalscorers</Button>
        </div>

      <div > Competition:{title}</div>
        <div className={styles.bigblue}>{score}</div>
      </Container>
      <div className={styles.table}>
      <Table className={styles.table}>      
          <tbody>
          {goalscorersList}
          </tbody>
        </Table>
        </div>
    </div>
  );
};
export default GameView;

