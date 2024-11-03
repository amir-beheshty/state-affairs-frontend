import { useMutation, useQuery } from '@tanstack/react-query';
import { getNews, searchNews } from './utils/api';
import Loading from './components/Loading/Loading';
import Chip from './components/Chip/Chip';
import { useEffect, useState } from 'react';
import { News } from './interfaces';
import Filter from './components/Filter/Filter';

enum FilterBy {
  State = 'state',
  Topic = 'topic',
  SearchKeyWord = 'search',
}

function App() {
  // empty string will not apply any filter. i.e. "all states" or "all topics"
  const [filter, setFilter] = useState({
    [FilterBy.State]: '',
    [FilterBy.Topic]: '',
    [FilterBy.SearchKeyWord]: '',
  });
  const { data, isLoading } = useQuery({ queryKey: ['news'], queryFn: getNews });
  const [filteredData, setFilteredData] = useState<News[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const searchMutation = useMutation({
    mutationFn: searchNews,
    onSuccess: (newsData) => {
      setFilteredData(newsData);
    },
  });

  useEffect(() => {
    // TODO: this should either enable debounce or optimized caching
    searchMutation.mutate({ ...filter });
  }, [filter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({ ...prev, [FilterBy.SearchKeyWord]: e.target.value }));
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>, filterBy: FilterBy) => {
    const { value } = e.target;
    setFilter((prev) => ({ ...prev, [filterBy]: value }));
  };

  // This is just for demo.
  // The idea is to enable filtering news data based on
  // available state news.
  const states = Array.from(new Set(data?.map((news) => news.state)));
  const topics = Array.from(new Set(data?.map((news) => news.topic)));

  if (isLoading) {
    return <Loading />;
  }

  if (!filteredData) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        <p>No news today!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4">
        <div className="relative">
          <input
            type="search"
            onChange={handleSearch}
            value={filter[FilterBy.SearchKeyWord]}
            placeholder="Search news..."
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Search news"
          />
        </div>
      </div>
      <Filter
        label="Filter By State"
        onFilter={(e) => handleFilter(e, FilterBy.State)}
        value={filter[FilterBy.State]}
        options={states}
      />
      <Filter
        label="Filter By Topic"
        onFilter={(e) => handleFilter(e, FilterBy.Topic)}
        value={filter[FilterBy.Topic]}
        options={topics}
      />
      <ul className="max-w-4xl mx-auto space-y-6 p-4">
        {filteredData.map(({ id, title, state, topic, summary, url, published_at }) => {
          return (
            <li
              key={id}
              className="list-none bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <div className="flex gap-2">
                  <Chip>{topic}</Chip>
                  <Chip primary>{state}</Chip>
                </div>
                <details className="group">
                  <summary className="cursor-pointer mb-3">{summary}</summary>
                  <div className="flex flex-col gap-3">
                    <a
                      href={url}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 hover:underline break-words"
                    >
                      {url}
                    </a>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">
                        {new Date(published_at).toDateString()}
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
