import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route,  Routes  } from 'react-router-dom';
import PlayerList from './PlayerList';
import PlayerEdit from './PlayerEdit';
import TeamList from './TeamList';
import TeamEdit from './TeamEdit';
import GameList from './GameList';
import GameEdit from './GameEdit';
import LeagueList from './LeagueList';
import LeagueEdit from './LeagueEdit';
import GoalscorersList from './GoalscorersList';
import GoalscorersEdit from './GoalscorersEdit';
import ParticipantsList from './ParticipantsList';
import ParticipantsEdit from './ParticipantsEdit';
import YoungerThan from './YoungerThan';
import OlderThan from './OlderThan';
import TeamPlayers from './TeamPlayers';
import TeamCity from './TeamCity';
import TeamCountry from './TeamCountry';
import LeagueNation from './LeagueNation';
import LeagueDivision from './LeagueDivision';
import GameHomeGames from './GameHomeGames';
import GameAwayGames from './GameAwayGames';
import GameAllGames from './GameAllGames';
import GoalscorersGame from './GoalscorersGame';
import GoalscorersPlayer from './GoalscorersPlayer';
import ParticipantsLeagues from './ParticipantsLeagues';
import ParticipantsTeams from './ParticipantsTeams';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/players' exact={true} element={<PlayerList/>}/>
        <Route path='/players/:id' element={<PlayerEdit/>}/>
        <Route path='/teams' exact={true} element={<TeamList/>}/>
        <Route path='/teams/:name' element={<TeamEdit/>}/>
        <Route path='/games' exact={true} element={<GameList/>}/>
        <Route path='/games/:id' element={<GameEdit/>}/>
        <Route path='/leagues' exact={true} element={<LeagueList/>}/>
        <Route path='/leagues/:id' element={<LeagueEdit/>}/>
        <Route path='/goalscorers' exact={true} element={<GoalscorersList/>}/>
        <Route path='/goalscorers/:game/:player' element={<GoalscorersEdit/>}/>
        <Route path='/goalscorers/:game' element={<GoalscorersEdit/>}/>
        <Route path='/participants' exact={true} element={<ParticipantsList/>}/>
        <Route path='/participants/:league' element={<ParticipantsEdit/>}/>
        <Route path='/participants/:league/:team' element={<ParticipantsEdit/>}/>
        <Route path='/youngerthan/:age' element={<YoungerThan/>}/>
        <Route path='/olderthan/:age' element={<OlderThan/>}/>
        <Route path='/:team/players' element={<TeamPlayers/>}/>
        <Route path='/teamsfromcity/:city' element={<TeamCity/>}/>
        <Route path='/teamsfromcountry/:country' element={<TeamCountry/>}/>
        <Route path='/leaguenation/:nation' element={<LeagueNation/>}/>
        <Route path='/leaguedivision/:division' element={<LeagueDivision/>}/>
        <Route path='/homegames/:team' element={<GameHomeGames/>}/>
        <Route path='/awaygames/:team' element={<GameAwayGames/>}/>
        <Route path='/allgames/:team' element={<GameAllGames/>}/>
        <Route path='/gamegoalscorers/:game' element={<GoalscorersGame/>}/>
        <Route path='/playergoals/:player' element={<GoalscorersPlayer/>}/>
        <Route path='/teamcompetitions/:team' element={<ParticipantsTeams/>}/>
        <Route path='/leagueparticipants/:league' element={<ParticipantsLeagues/>}/>
      </Routes>
    </Router>
  )
}

export default App;


