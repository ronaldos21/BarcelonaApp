import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ResultsTable from '../components/ResultsTable'; // Make sure this import is included
import News from '../components/News';
import Players from '../components/Players';
import MatchSchedule from '../components/MatchSchedule';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
    const [results, setResults] = useState([]);
    const [news, setNews] = useState([]);
    const [players, setPlayers] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false); // State for controlling expansion

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultsResponse = await axios.get('/v4/teams/81/matches', {
                    headers: {
                        'X-Auth-Token': '53a700f70095459298ac7b1a2f83201f' // Your API token
                    }
                });
                console.log('API Response:', resultsResponse.data);
                setResults(resultsResponse.data.matches || []);

                // Fetch other data (news, players, schedule)...
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded); // Toggle the expanded state
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Welcome to Barcelona FC Updates</h1>
            <ThemeToggle />

            <Link to="/results">
                <h2 className="text-2xl font-bold mt-6 text-blue-500">Latest Match Results</h2>
            </Link>

            <button
                onClick={toggleExpand}
                className="mt-4 text-lg text-blue-600">
                {isExpanded ? 'Hide Results' : 'Show Results'}
            </button>

            {isExpanded && <ResultsTable results={results} />} {/* Conditionally render ResultsTable */}

            <h2 className="text-2xl font-bold mt-6">Latest News</h2>
            <News news={news} />

            <h2 className="text-2xl font-bold mt-6">Players</h2>
            <Players players={players} />

            <h2 className="text-2xl font-bold mt-6">Upcoming Matches</h2>
            <MatchSchedule schedule={schedule} />
        </div>
    );
};

export default Home;
