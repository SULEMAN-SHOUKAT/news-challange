import { useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export type SearchQuery = {
  text?: string;
  from?: string;
  to?: string;
  categories?: string[];
  sources?: string[];
  authors?: string[];
};

const ARRAY_FIELDS = ["categories", "sources", "authors"];

const useSearchQuery = () => {
  const [query, setQuery] = useState<SearchQuery>();
  const [searchParams, setSearchParams] = useSearchParams(query);

  const updateSearchParams = useCallback(
    (query: SearchQuery) => {
      let newQuery = {};
      const queryKeys = Object.keys(query);
      queryKeys.forEach((key) => {
        if (ARRAY_FIELDS.includes(key)) {
          newQuery = {
            ...newQuery,
            [key]: (query[key as keyof SearchQuery] as string[]).join(","),
          };
        } else {
          newQuery = { ...newQuery, [key]: query[key as keyof SearchQuery] };
        }
      });
      setSearchParams(newQuery);
    },
    [query, setQuery, setSearchParams]
  );

  const setSearchQuery = useCallback(
    (value: string | string[], key: string) => {
      let newQuery = { ...query };
      if ((!value || !value.length) && query && key in query) {
        delete newQuery[key as keyof SearchQuery];
      } else {
        newQuery = { ...newQuery, [key]: value };
      }
      setQuery(newQuery);
      updateSearchParams(newQuery);
    },
    [query, setQuery, updateSearchParams]
  );

  useEffect(() => {
    let initQuery = {};
    searchParams.forEach((value, key) => {
      if (ARRAY_FIELDS.includes(key) && !!value)
        initQuery = { ...initQuery, [key]: value.split(",") };
      else initQuery = { ...initQuery, [key]: value };
      setQuery(initQuery);
    });
  }, []);

  return {
    query,
    setSearchQuery,
  };
};

export default useSearchQuery;
