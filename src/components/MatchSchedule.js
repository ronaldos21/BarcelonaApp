import { useState } from 'react';

const MatchSchedule = ({ schedule }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const matchesPerPage = 10;


    const filteredSchedule = schedule.filter(match =>
        match.homeTeam.name.toLowerCase().includes(filter.toLowerCase()) ||
        match.awayTeam.name.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastMatch = currentPage * matchesPerPage;
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
    const currentMatches = filteredSchedule.slice(indexOfFirstMatch, indexOfLastMatch);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    console.log('Schedule Prop:', schedule); // Log the schedule prop
    if (!schedule.length) {
        return <p>No matches scheduled.</p>; // Handle the case when schedule is empty
    }

    return (
        <div>
            {/* Filter/Search Bar - Outside the scrollable table */}
            <div className="flex items-center mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by team name"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ease-in-out duration-150 w-64"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.293 12.293a1 1 0 011.414 0l4.3 4.3a1 1 0 01-1.414 1.414l-4.3-4.3a1 1 0 010-1.414zM8.5 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <button
                    onClick={() => setFilter('')}
                    className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition duration-150"
                >
                    Clear
                </button>
            </div>

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
                        {currentMatches.map((match) => (
                            <tr
                                key={match.id}
                                className="hover:bg-gray-100 transition ease-in-out duration-150"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(match.utcDate).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {match.homeTeam.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {match.awayTeam.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
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
