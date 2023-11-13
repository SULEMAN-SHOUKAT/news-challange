import useDebounce from "../../hooks/useDebounce";
import useNews from "../../hooks/useNews";
import useSearchQuery, { type SearchQuery } from "../../hooks/useSearchQuery";
import News from "./News";

import SearchBar from "./Search";
import useFilter from "../../hooks/useFilter";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import Header from "../../components/Header";

const Browse = () => {
  const { query, setSearchQuery } = useSearchQuery();
  const debouncedQuery = useDebounce(query, 1000);
  const { data: newses } = useNews(debouncedQuery as SearchQuery);
  const { filteredNews } = useFilter(debouncedQuery as SearchQuery, newses);

  return (
    <div>
      <Header />
      <div className="pl-2 pr-2 flex items-center flex-col">
        <div className="w-full  md:w-3/4  md:p-10 mt-4 ">
          <SearchBar
            query={query}
            setSearchQuery={setSearchQuery}
            newses={newses}
          />
        </div>

        {filteredNews || newses ? (
          <div className="w-full md:w-3/4  md:p-10 mt-4">
            <News newses={filteredNews || newses} />
          </div>
        ) : (
          <div className="w-full p-10 mt-6">
            <LoadingSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
