const News = ({ news }) => {
    if (!Array.isArray(news) || news.length === 0) {
        return <p>No news available.</p>; // Handle the case when news is not an array or is empty
    }

    return (
        <div>
            {news.map((article, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{article.title}</h3>
                    <p>{article.description}</p>
                    <a href={article.url} className="text-blue-500 underline">Read more</a>
                </div>
            ))}
        </div>
    );
};

export default News;