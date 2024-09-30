import ResultsTable from '../components/ResultsTable';

const Results = ({ results }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Match Results</h2>
            <ResultsTable results={results} />
        </div>
    );
};

export default Results;
