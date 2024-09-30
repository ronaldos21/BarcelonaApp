import { useState, useEffect } from 'react';

const MatchSchedule = ({ schedule }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterTeamName, setFilterTeamName] = useState('');
    const [filterByDate, setFilterByDate] = useState('');
    const [loading, setLoading] = useState(true);
    const matchesPerPage = 10;

    useEffect(() => {
        // Simulate a data fetch
        setTimeout(() => {
            setLoading(false); // Once data is fetched
        }, 2000);
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
    }

    const today = new Date().toLocaleDateString('en-CA'); // Ensure consistent date format

    // Filter the schedule by team name and date (if date is selected)
    const filteredSchedule = schedule.filter(match => {
        const matchDate = new Date(match.utcDate).toLocaleDateString('en-CA');

        const matchesTeamFilter =
            match.homeTeam.name.toLowerCase().includes(filterTeamName.toLowerCase()) ||
            match.awayTeam.name.toLowerCase().includes(filterTeamName.toLowerCase());

        const matchesDateFilter =
            !filterByDate || matchDate === filterByDate; // Compare match date to filter date

        return matchesTeamFilter && matchesDateFilter;
    });



    const indexOfLastMatch = currentPage * matchesPerPage;
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
    const currentMatches = filteredSchedule.slice(indexOfFirstMatch, indexOfLastMatch);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // If no matches are found, display this block with an option to reset filters
    if (!filteredSchedule.length) {
        return (
            <div className="text-center">
                <p className="text-gray-700 text-lg mb-4">No matches found for the current filters.</p>
                <button
                    onClick={() => {
                        setFilterTeamName('');
                        setFilterByDate('');
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition duration-150"
                >
                    Return to Full Schedule
                </button>
            </div>
        );
    }





    return (
        <div>
            {/* Filter/Search Bar */}
            <div className="flex items-center mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by Team Name"
                        value={filterTeamName}
                        onChange={(e) => setFilterTeamName(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ease-in-out duration-150 w-64"
                    />
                </div>
                <div className="relative ml-4">
                    <input
                        type="date"
                        value={filterByDate}
                        onChange={(e) => setFilterByDate(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ease-in-out duration-150"
                    />
                </div>

                <button
                    onClick={() => {
                        setFilterTeamName('');
                        setFilterByDate('');
                    }}
                    className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition duration-150"
                >
                    Clear
                </button>
            </div>

            {filterByDate && (
                <div className="mb-4 text-lg font-semibold text-gray-700">
                    {filteredSchedule.length === 1 ?
                        `Match for ${filterByDate}` :
                        `Matches for ${filterByDate}`
                    }
                </div>
            )}

            {/* Scrollable Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Home Team</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Away Team</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentMatches.map((match) => {
                            const matchDate = new Date(match.utcDate);
                            const isToday = matchDate.toLocaleDateString('en-CA') === today;

                            return (
                                <tr
                                    key={match.id}
                                    className={`hover:bg-gray-100 transition ease-in-out duration-150 ${isToday ? 'bg-yellow-100' : ''}`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {matchDate.toLocaleDateString('en-CA')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        {match.homeTeam.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        {match.awayTeam.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(filteredSchedule.length / matchesPerPage)).keys()].map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number + 1)}
                        className={`px-4 py-2 m-1 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MatchSchedule;
