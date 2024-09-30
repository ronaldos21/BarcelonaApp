import MatchSchedule from '../components/MatchSchedule';

const SchedulePage = ({ schedule }) => { // Accept schedule as a prop
    return (
        <div className="p-4">
            <MatchSchedule schedule={schedule} /> {/* Pass schedule to MatchSchedule */}
        </div>
    );
};

export default SchedulePage;
