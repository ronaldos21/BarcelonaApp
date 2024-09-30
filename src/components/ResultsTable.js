const ResultsTable = ({ results }) => {
    if (!results.length) {
        return <p>No scheduled matches available.</p>; // Handle empty results
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Home Team
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Away Team
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Match Day
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Winner
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((match) => (
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
                            <td className={`px-6 py-4 whitespace-nowrap text-sm 
                                ${match.status === "FINISHED" ? 'text-green-500' : 'text-red-500'}`}>
                                {match.status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {match.matchday}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {match.score.fullTime.home} - {match.score.fullTime.away}
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold
                                ${match.score.winner === "HOME_TEAM" ? 'text-blue-500' : match.score.winner === "AWAY_TEAM" ? 'text-red-500' : 'text-gray-500'}`}>
                                {match.score.winner ? match.score.winner.replace("_TEAM", " Team") : "Draw"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;
