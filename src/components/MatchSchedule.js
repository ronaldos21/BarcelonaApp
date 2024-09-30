const MatchSchedule = ({ schedule }) => {
    console.log('Schedule Prop:', schedule); // Log the schedule prop
    if (!schedule.length) {
        return <p>No matches scheduled.</p>; // Handle the case when schedule is empty
    }

    return (
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
                    {schedule.map((match) => (
                        <tr
                            key={match.id}
                            className="hover:bg-gray-100 transition ease-in-out duration-150"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {new Date(match.utcDate).toLocaleString()} {/* Convert UTC date to local format */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {match.homeTeam.name} {/* Home team name */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {match.awayTeam.name} {/* Away team name */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* Format time */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatchSchedule;
