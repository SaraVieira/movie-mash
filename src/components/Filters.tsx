import { genres } from "../constants/genres";
import { SearchHeader } from "../components/SearchHeader";
import { useEffect, useState } from "react";
import { sortBy } from "../constants/filters";

export const Filters = ({ onChange }) => {
  const [genre, setGenre] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState<string>(sortBy[0].value);

  useEffect(() => {
    if (genre || search !== "" || selectedSort !== sortBy[0].value)
      onChange({ search, selectedSort, genre });
  }, [genre, search, selectedSort, onChange]);

  return (
    <div className="flex flex-wrap mb-7 gap-6 justify-between">
      <div>
        <select
          id="genres"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-[300px]"
          onChange={(e) => setGenre(parseInt(e.target.value))}
          value={genre}
        >
          <option>Filter by genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <SearchHeader
        onSearch={setSearch}
        open
        placeholder="Search in your watched movies"
        required={false}
      />
      <div>
        <select
          id="sort"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  min-w-[300px]"
          onChange={(e) => setSelectedSort(e.target.value)}
          value={selectedSort}
        >
          <option>Sort by</option>
          {sortBy.map((sortValue) => (
            <option key={sortValue.value} value={sortValue.value}>
              {sortValue.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
