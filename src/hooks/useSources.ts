import { type News } from "../services/newsService";

const extractSources = (newses?: News[]) => {
  const sources: string[] = [];
  newses?.map((news) => {
    if (news.source && !sources.includes(news.source))
      sources.push(news.source);
  });
  return sources;
};

const useSources = (newses?: News[]) => {
  const sources = extractSources(newses);
  return { sources };
};

export default useSources;
