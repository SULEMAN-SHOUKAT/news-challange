import { useQuery } from "@tanstack/react-query";
import newsService, { type News } from "../services/newsService";
import type { SearchQuery } from "./useSearchQuery";

const ObjectHasAValue = (query: SearchQuery) =>
  query
    ? Object.keys(query).some((key) => !!query[key as keyof SearchQuery])
    : false;

const shouldMakeQuery = (query: SearchQuery) =>
  ObjectHasAValue(query) && (!!query.text || !!query.from || !!query.to);

const useNews = (query: SearchQuery) =>
  useQuery<News[]>({
    queryKey: [
      "searchQuery",
      { text: query?.text, from: query?.from, to: query?.to },
    ],
    queryFn: () => newsService.getNewses(query),
    enabled: shouldMakeQuery(query),
  });

export default useNews;
