import { type News } from "../services/newsService";
import { type SearchQuery } from "./useSearchQuery";

const useFilter = (query: SearchQuery, newses?: News[]) => {
  const getFilteredNews = () => {
    if (query?.categories || query?.sources || query?.authors) {
      return newses?.filter(
        (news) =>
          (query?.categories &&
            news.category &&
            query.categories.includes(news.category)) ||
          (query?.sources &&
            news.source &&
            query.sources.includes(news.source)) ||
          (query?.authors && news.author && query.authors.includes(news.author))
      );
    } else {
      return newses;
    }
  };

  return { filteredNews: getFilteredNews() };
};

export default useFilter;
