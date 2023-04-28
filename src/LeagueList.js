import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Input, Label, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const LeagueList = () => {

  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  var nation;
  var division;
  function findByCity(){
    nation = document.getElementById("nation").value;
    window.location = "/leaguenation/"+ nation;
  }
  function findByCountry(){
    division = document.getElementById("division").value;
    window.location = "/leaguedivision/"+ division;
  }
  useEffect(() => {
    setLoading(true);

    fetch('/leagues')
      .then(response => response.json())
      .then(data => {
        setLeagues(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/leagues/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedLeagues = [...leagues].filter(i => i.leagueId !== id);
      setLeagues(updatedLeagues);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const leagueList = leagues.map(league => {
    
    return <tr key={league.leagueId}>
      <td style={{whiteSpace: 'nowrap'}}>{league.leagueName}</td>
      <td>{league.leagueNation}</td>
      <td>{league.leagueDivision}</td>
      <td>{league.season}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/leagues/" + league.leagueId}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(league.leagueId)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/leagues/add">Add League</Button>
        </div>
        <h3>League</h3>
        <table>
        <thead>
          <tr>
            <th width ="25%">
              Find leagues for COUNTRY:
            </th>
            <th width ="30%">
            <Label for="nation">Nation</Label>
            <Input type="text" width="2" name="nation" id="nation" value={nation}  autoComplete="nation"/>          
            </th>
            <th width="10%">
            </th>
            <th width="15%">
            <Button color="secondary" onClick={findByCity}>Find</Button>
          </th>
          

          </tr>
          <tr>
            <th width ="25%">
              Find leagues that are DIVISION:
            </th>
            <th width ="30%">
            <Label for="division">Division</Label>
            <Input type="text" width="2" name="division" id="division" value={division}  autoComplete="division"/>          
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
            <th width="30%">Name</th>
            <th width="20%">Nation</th>
            <th width="20%">Division</th>
            <th width="30%">Season</th>
          </tr>
          </thead>
          <tbody>
          {leagueList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default LeagueList;
