import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useParams } from 'react-router-dom';

const TeamList = () => {

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const {city} = useParams();

  useEffect(() => {
    setLoading(true);

    fetch('/teams')
      .then(response => response.json())
      .then(data => {

        setTeams(data.filter(i=>i.city===city));
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/teams/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedTeams = [...teams].filter(i => i.teamId !== id);
      setTeams(updatedTeams);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const teamList = teams.map(team => {
    return <tr key={team.teamId}>
      <td style={{whiteSpace: 'nowrap'}}>{team.teamName}</td>
      <td>{team.country}</td>
      <td>{team.city}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/teams/" + team.teamId}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(team.teamId)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/teams/add">Add Team</Button>
        </div>
        <h3>Teams</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="40%">Name</th>
            <th width="20%">Country</th>
            <th width="40%">City</th>
          </tr>
          </thead>
          <tbody>
          {teamList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default TeamList;
