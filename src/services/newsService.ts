import type { SearchQuery } from "../hooks/useSearchQuery";
import guardian from "./newsSources/guardian";
import newsApi from "./newsSources/newsApi";
import nyTimes from "./newsSources/nyTimes";

export type News = {
  title: string;
  url: string;
  publishedAt: Date;
  source: string;
  author?: string;
  description?: string;
  urlToImage?: string;
  category?: string;
};

const getNewses = async (query: SearchQuery) => {
  const [newsApiPromise, nyTimesPromise, guardianPromise] =
    await Promise.allSettled([
      newsApi.get(query),
      nyTimes.get(query),
      guardian.get(query),
    ]);

  const results = [newsApiPromise, nyTimesPromise, guardianPromise]
    .filter((promiseResult) => promiseResult.status === "fulfilled")
    .map((promiseResult) => (promiseResult as { value: News[] }).value);

  const combinedNews = results.flatMap((result) => result);

  return combinedNews;
};

export default { getNewses };
