import Input from "../../components/Input";

import MultiSelect from "../../components/MultiSelect";
import useSources from "../../hooks/useSources";
import useCategories from "../../hooks/useCategories";

import type { SearchQuery } from "../../hooks/useSearchQuery";
import { type News } from "../../services/newsService";
import useAuthors from "../../hooks/useAuthors";

type SearchBarProps = {
  query?: SearchQuery;
  newses?: News[];
  setSearchQuery: (value: string | string[], key: string) => void;
};

const SearchBar = ({ query, setSearchQuery, newses }: SearchBarProps) => {
  const { sources } = useSources(newses);
  const { categories } = useCategories(newses);
  const { authors } = useAuthors(newses);

  return (
    <div>
      <Input
        title="Search"
        id="searchText"
        type="text"
        value={query?.text || ""}
        hideLabel
        onChange={(value: string) => setSearchQuery(value, "text")}
      />

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 md:mr-4 ml">
          <Input
            title="From"
            id="fromDte"
            type="date"
            value={query?.from || ""}
            onChange={(value: string) => setSearchQuery(value, "from")}
          />
        </div>
        <div className="w-full md:w-1/4  md:mr-4">
          <Input
            title="To"
            id="toDate"
            type="date"
            value={query?.to || ""}
            onChange={(value: string) => setSearchQuery(value, "to")}
          />
        </div>
      </div>
      <div className="font-semibold mt-4 ">Filters</div>
      <div className="flex flex-col md:flex-row">
        {!!categories.length && (
          <div className="w-full md:w-1/4  md:mr-4">
            <MultiSelect
              title="Category"
              selectedOptions={query?.categories as string[]}
              options={categories}
              onSelect={(value: string[]) =>
                setSearchQuery(value, "categories")
              }
            />
          </div>
        )}

        {!!sources.length && (
          <div className="w-full md:w-1/4  md:mr-4">
            <MultiSelect
              title="Sources"
              selectedOptions={query?.sources as string[]}
              options={sources}
              onSelect={(value: string[]) => setSearchQuery(value, "sources")}
            />
          </div>
        )}
        {!!authors.length && (
          <div className="md:w-1/4 block">
            <MultiSelect
              title="Authors"
              selectedOptions={query?.authors as string[]}
              options={authors}
              onSelect={(value: string[]) => setSearchQuery(value, "authors")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
