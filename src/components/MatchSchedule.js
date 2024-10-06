import { useState, useEffect } from 'react';

const MatchSchedule = ({ schedule }) => {

    // 1. State Management
    const [currentPage, setCurrentPage] = useState(1);
    const [filterTeamName, setFilterTeamName] = useState('');
    const [filterByDate, setFilterByDate] = useState('');
    const [filterByStatus, setFilterByStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const matchesPerPage = 7;
    const [sortColumn, setSortColumn] = useState('date');
    const [sortOrder, setSortOrder] = useState('asc');

    // 2. Data Loading
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    // 3. Helper Functions
    // a) Format UTC date to YYYY-MM-DD

    const today = new Date().toLocaleDateString('en-CA'); // Ensure consistent date format

    const extractDateFromUtc = (utcDate) => utcDate.split('T')[0];

    // b) Get match status (Upcoming, Live, Finished)
    const getMatchStatus = (utcDate) => {
        const matchTime = new Date(utcDate).getTime();
        const now = new Date().getTime();
        const matchDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

        if (now < matchTime) {
            return { status: "Upcoming", color: "text-blue-500", icon: "🕒" }
        }
        else if (now >= matchTime && now <= matchTime + matchDuration) {
            return { status: "Live", color: "text-green-500", icon: "🔴" }
        }
        else {
            return { status: "Finished", color: "text-red-500", icon: "🏁" };
        }
    };

    // c) Countdown Timer for each match
    const getCountdown = (utcDate) => {
        const matchTime = new Date(utcDate).getTime();
        const now = new Date().getTime();
        const matchDuration = 2 * 60 * 60 * 1000; // Assuming match duration is 2 hours
        const timeDiff = matchTime - now;

        // Check if the match is live (match has started but not ended)
        if (timeDiff <= 0 && now <= matchTime + matchDuration) {
            return "Match has started!";
        }

        // Check if the match has ended
        if (now > matchTime + matchDuration) {
            return "Match has ended!";
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        return `${days}d ${hours}h ${minutes}`;
    };

    // d) Get sort arrow indicator
    const getArrow = (column) => {
        if (sortColumn === column) {
            return sortOrder === 'asc' ? '▲' : '▼'; // Show up or down arrow based on the sort order
        }
        return ''; //No arrow if this column is not currently sorted
    };

    // e) Handle sorting when a column is clicked
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortColumn(column)
            setSortOrder('asc');
        }
    };

    // 4. Filtering and Sorting
    // Filter the schedule by team name (if date is selected)
    const filteredSchedule = schedule.filter(match => {
        const matchDate = extractDateFromUtc(match.utcDate);
        const matchStatus = getMatchStatus(match.utcDate).status;

        const matchesTeamFilter =
            match.homeTeam.name.toLowerCase().includes(filterTeamName.toLowerCase()) ||
            match.awayTeam.name.toLowerCase().includes(filterTeamName.toLowerCase());

        const matchesDateFilter = !filterByDate || matchDate === filterByDate; // Compare match date to selected filter date
        const matchesStatusFilter = !filterByStatus || matchStatus === filterByStatus; // New status filter

        return matchesTeamFilter && matchesDateFilter && matchesStatusFilter;
    });

    //Sort the schedule
    const sortedSchedule = [...filteredSchedule].sort((a, b) => {
        let comparison = 0;
        if (sortColumn === 'date') {
            comparison = new Date(a.utcDate) - new Date(b.utcDate);
        }
        else if (sortColumn === 'homeTea') {
            comparison = a.homeTeam.name.localeCompare(b.homeTeam.name);
        }
        else if (sortColumn === 'awayTeam') {
            comparison = a.awayTeam.name.localeCompare(b.awayTeam.name);

        }
        return sortOrder === 'asc' ? comparison : -comparison

    });

    // 5. Pagination
    const indexOfLastMatch = currentPage * matchesPerPage;
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
    const currentMatches = sortedSchedule.slice(indexOfFirstMatch, indexOfLastMatch);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 6. UI Rendering
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                <p className="mt-4 text-blue-500 text-lg">Hang Tight! Matches are loading...</p>
            </div>
        );
    }

    // If no matches are found, display this block with an option to reset filters
    if (!filteredSchedule.length) {
        return (
            <div className="text-center">
                <p className="text-gray-700 text-lg mb-4">No matches found for the current filters.</p>
                <button
                    onClick={() => {
                        setFilterTeamName('');
                        setFilterByDate('');
                        setFilterByStatus('');
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition duration-150"
                >
                    Return to Full Schedule
                </button>
            </div>
        );
    }

    // 7. Main UI Layout
    return (
        <div>
            {/* Filter/Search Bar */}
            <div className="flex flex-col sm:flex-row items-center mb-4">
                <div className="relative mb-2 sm:mb-0">
                    {/* Team Name Filter */}
                    <input
                        type="text"
                        placeholder="Search by Team Name"
                        value={filterTeamName}
                        onChange={(e) => setFilterTeamName(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ease-in-out duration-150 w-full sm:w-64"
                    />
                </div>
                <div className="relative ml-0 sm:ml-4 mb-2 sm:mb-0">

                    {/* Date Filter */}
                    <input
                        type="date"
                        value={filterByDate}
                        onChange={(e) => setFilterByDate(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ease-in-out duration-150 w-full sm:w-auto ml-4"
                    />
                </div>

                <div className="relative ml-0 sm:ml-4 mb-2 sm:mb-0">
                    {/* Status Filter */}
                    <select
                        value={filterByStatus}
                        onChange={(e) => setFilterByStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ease-in-out duration-150 ml-4"
                    >
                        <option value="">All Statuses</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Live">Live</option>
                        <option value="Finished">Finished</option>
                    </select>
                </div>

                {/* Clear Filters */}
                <button
                    onClick={() => {
                        setFilterTeamName('');
                        setFilterByDate('');
                        setFilterByStatus('');
                    }}
                    className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition duration-150"
                >
                    Clear
                </button>
            </div>

            {/* Matches Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-blue-100 hidden sm:table-header-group">
                        <tr>
                            <th onClick={() => handleSort('date')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date {getArrow('date')}</th>
                            <th onClick={() => handleSort('homeTeam')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Home Team {getArrow('homeTeam')}</th>
                            <th onClick={() => handleSort('awayTeam')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Away Team {getArrow('awayTeam')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">CountDown</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentMatches.map((match) => {
                            const matchDate = new Date(match.utcDate);
                            const isToday = matchDate.toLocaleDateString('en-CA') === today;
                            const matchStatus = getMatchStatus(match.utcDate);

                            return (
                                <tr key={match.id} className={`hover:bg-gray-200 transition ease-in-out duration-150 ${isToday ? 'bg-yellow-100' : ''}`}>

                                    <td className="px-6 py-4 block sm:table-cell text-sm text-gray-600">{matchDate.toLocaleDateString('en-CA')}</td>
                                    <td className={`px-6 py-4 block sm:table-cell text-sm font-medium ${match.homeTeam.name === "FC Barcelona" ? 'text-red-600' : 'text-gray-800'}`}>{match.homeTeam.name}</td>
                                    <td className={`px-6 py-4 block sm:table-cell text-sm font-medium ${match.awayTeam.name === "FC Barcelona" ? 'text-red-600' : 'text-gray-800'}`}>{match.awayTeam.name}</td>
                                    <td className="px-6 py-4 block sm:table-cell text-sm text-gray-600">{matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td className="px-6 py-4 block sm:table-cell text-sm text-gray-600">{getCountdown(match.utcDate)}</td>
                                    <td className={`px-6 py-4 block sm:table-cell text-sm font-medium ${matchStatus.color}`}>{matchStatus.icon} {matchStatus.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 m-1 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                >
                    Previous
                </button>
                {[...Array(Math.ceil(filteredSchedule.length / matchesPerPage)).keys()].map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number + 1)}
                        className={`px-4 py-2 m-1 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {number + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredSchedule.length / matchesPerPage)}
                    className={`px-4 py-2 m-1 ${currentPage === Math.ceil(filteredSchedule.length / matchesPerPage) ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MatchSchedule;
