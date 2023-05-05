import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useParams } from 'react-router-dom';

const ParticipantsLeague = () => {

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const {league} = useParams();

  useEffect(() => {
    setLoading(true);

    fetch('/participants')
      .then(response => response.json())
      .then(data => {
        const sort = data.sort((a,b)=>b.points-a.points)
        setParticipants(sort.filter(i=>i.league.leagueId==league));
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
      let updatedParticipants = [...participants].filter(i => i.league.leagueId !== league || i.team.teamName !== team);
      setParticipants(updatedParticipants);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  
  const participantsList = participants.map(participant => {
    const id = `${participant.league.leagueId}-${participant.team.teamName}`;
    return <tr key={id}>
      <td>  {participant.team.teamName}</td>
      <td>  {participant.league.leagueName}</td>
      <td>  {participant.points}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/participants/" + participant.league.leagueId + "/" +participant.team.teamId}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(participant.league.leagueId,participant.team.teamName)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to={"/league/" + league + "/add"}>Add participant</Button>
        </div>
        <h3>Participants</h3>
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

export default ParticipantsLeague;
