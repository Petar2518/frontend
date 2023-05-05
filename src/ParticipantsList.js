import React, { useEffect, useState } from 'react';
import { Button, Container} from 'reactstrap';
import AppNavbar from './AppNavbar';
import myApi from './api/myApi';
import AsyncSelect from 'react-select/async';

const ParticipantsList = () => {

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  function findLeaguesWithTeam(){
    window.location = "/teamcompetitions/"+ participants.team.teamId;
  }
  function findTeamsInLeague(){
    window.location = "/leagueparticipants/"+ participants.league.leagueId;
  }
  const fetchLeagues = async () => {
    const result = await myApi.get('/leagues');
    const res = result.data;
    return res;
  }
  const fetchTeams = async () => {
    const result = await myApi.get('/teams');
    const res = result.data;
    return res;
  }
  const handleChange = (event) => {
    const { name, value } = event.target

    setParticipants({ ...participants, [name]: value })
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

 
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AppNavbar/>
      <Container fluid>

        <h3>Participants</h3>
        <table>
        <thead>
          <tr>
            <th width ="25%">
              Find all leagues where TEAM participates:
            </th>
            <th width ="30%">
            <AsyncSelect
          name="team"
          id="team"
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={participants.team}
          getOptionLabel={e => e.teamName + ', ' + e.city + ', ' + e.country }
          getOptionValue={e => e.teamId}
          loadOptions={fetchTeams}
          onChange={team=>handleChange({target:{value: team, name:'team'}})}
        />
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" disabled={!participants.team} onClick={findLeaguesWithTeam}>Find</Button>
          </th>
          </tr>
          <tr>
            <th width ="25%">
              Find all teams in LEAGUE:
            </th>
            <th width ="30%">
            <AsyncSelect
          name="league"
          id="league"
          cacheOptions
          isSearchable={false}
          defaultOptions
          value={participants.league}
          getOptionLabel={e => e.leagueName + ' ' +e.season}
          getOptionValue={e => e.leagueId}
          loadOptions={fetchLeagues}
          onChange={leagues=>handleChange({target:{value: leagues, name:'league'}})}
        />        
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" disabled={!participants.league} onClick={findTeamsInLeague}>Find</Button>
          </th>
          </tr>
        </thead>
        </table>
      </Container>
    </div>
  );
};

export default ParticipantsList;
