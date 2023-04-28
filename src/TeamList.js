import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Input, Label, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const TeamList = () => {

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  var city;
  var country;
  function findByCity(){
    city = document.getElementById("city").value;
    window.location = "/teamsfromcity/"+ city;
  }
  function findByCountry(){
    country = document.getElementById("country").value;
    window.location = "/teamsfromcountry/"+ country;
  }

  useEffect(() => {
    setLoading(true);

    fetch('/teams')
      .then(response => response.json())
      .then(data => {
        setTeams(data);
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
      let updatedTeams = [...teams].filter(i => i.teamId != id);
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
        <table>
        <thead>
          <tr>
            <th width ="25%">
              Find teams from CITY:
            </th>
            <th width ="30%">
            <Label for="city">City</Label>
            <Input type="text" width="2" name="city" id="city" value={city}  autoComplete="city"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findByCity}>Find</Button>
          </th>
          

          </tr>
          <tr>
            <th width ="25%">
              Find teams from COUNTRY:
            </th>
            <th width ="30%">
            <Label for="country">Country</Label>
            <Input type="text" width="2" name="country" id="country" value={country}  autoComplete="country"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findByCountry}>Find</Button>
          </th>
          

          </tr>
        </thead>
        </table>
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
