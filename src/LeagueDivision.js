import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Input, Label, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useParams } from 'react-router-dom';

const LeagueList = () => {

  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const {division} = useParams();

  useEffect(() => {
    setLoading(true);

    fetch('/leagues')
      .then(response => response.json())
      .then(data => {
        setLeagues(data.filter(i=> i.leagueDivision===division));
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
