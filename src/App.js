import axios from 'axios'; // Add this line
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Results from './pages/Results';
import NewsPage from './pages/News';
import PlayersPage from './pages/Players';
import SchedulePage from './pages/Schedule';
import { useEffect, useState } from 'react';

const App = () => {
  const [results, setResults] = useState([]);
  const [schedule, setSchedule] = useState([]); // Add schedule state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch match results
        const response = await axios.get('/v4/teams/81/matches', { // Use correct team ID
          headers: {
            'X-Auth-Token': '53a700f70095459298ac7b1a2f83201f' // Your API token
          }
        });

        ///v4/teams/81/matches?status=SCHEDULED

        const matches = response.data.matches || [];
        console.log('Fetched Matches:', matches); // Log fetched matches


        // Filter for scheduled matches
        //const scheduledMatches = matches.filter(match => match.status === 'SCHEDULED');
        //console.log('Scheduled Matches:', scheduledMatches); // Log scheduled matches
        //setResults(matches);
        //setSchedule(scheduledMatches); // Set the schedule state

        // Pass all matches to both results and schedule
        //setResults(matches);
        setSchedule(matches); // Set schedule to all matches instead of just scheduled ones



      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home results={results} />} />
        <Route path="/results" element={<Results results={results} />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/schedule" element={<SchedulePage schedule={schedule} />} /> {/* Use SchedulePage here */}
      </Routes>
    </Router>
  );
};

export default App;
