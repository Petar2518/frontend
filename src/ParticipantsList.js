import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container,  Input,  Label,  Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const ParticipantsList = () => {

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  var team;
  var league;
  function findLeaguesWithTeam(){
    team = document.getElementById("team").value;
    window.location = "/teamcompetitions/"+ team;
  }
  function findTeamsInLeague(){
    league = document.getElementById("league").value;
    window.location = "/leagueparticipants/"+ league;
  }

  useEffect(() => {
    setLoading(true);

    fetch('/participants')
      .then(response => response.json())
      .then(data => {
        setParticipants(data);
        setLoading(false);
      })
  }, []);

  const remove = async (league, team) => {
    await fetch(`/participants/delete/${league}/${team}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedParticipants = [...participants].filter(i => i.league.leagueId !== league || i.team.teamId !== team);
      setParticipants(updatedParticipants);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  
  const participantsList = participants.map(participant => {
    const id = `${participant.league.leagueId}-${participant.team.teamId}`;
    return <tr key={id}>
      <td>  {participant.team.teamName}</td>
      <td>  {participant.league.leagueName}</td>
      <td>  {participant.points}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/participants/" + participant.league.leagueId + "/" +participant.team.teamId}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(participant.league.leagueId,participant.team.teamId)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/participants/add">Add participant</Button>
        </div>
        <h3>Participants</h3>
        <table>
        <thead>
          <tr>
            <th width ="25%">
              Find all leagues where TEAM participates:
            </th>
            <th width ="30%">
            <Label for="team">Team</Label>
            <Input type="text"  name="team" id="team" value={team}  autoComplete="team"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findLeaguesWithTeam}>Find</Button>
          </th>
          </tr>
          <tr>
            <th width ="25%">
              Find all teams in LEAGUE:
            </th>
            <th width ="30%">
            <Label for="league">League</Label>
            <Input type="text"  name="league" id="league" value={league}  autoComplete="league"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findTeamsInLeague}>Find</Button>
          </th>
          

          </tr>
        </thead>
        </table>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="40%">Team</th>
            <th width="40%">League</th>
            <th width="20%">Points</th>
          </tr>
          </thead>
          <tbody>
          {participantsList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ParticipantsList;
