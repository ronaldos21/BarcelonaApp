const Players = ({ players }) => {

    if (!Array.isArray(players) || players.length === 0) {
        return <p>No news available.</p>; // Handle the case when news is not an array or is empty
    }

    return (
        <div>
            {players.map((player, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{player.name}</h3>
                    <p>Position: {player.position}</p>
                    <p>Goals: {player.goals}</p>
                </div>
            ))}
        </div>
    );
};

export default Players;
