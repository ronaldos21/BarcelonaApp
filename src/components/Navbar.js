import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-white text-lg font-bold">FC Barcelona Updates</h1>
                <div>
                    <Link to="/" className="text-white mx-4">Home</Link>
                    <Link to="/results" className="text-white mx-4">Results</Link>
                    <Link to="/news" className="text-white mx-4">News</Link>
                    <Link to="/players" className="text-white mx-4">Players</Link>
                    <Link to="/schedule" className="text-white mx-4">Schedule</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
