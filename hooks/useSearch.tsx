import { useState, useEffect } from 'react';
import filter from 'lodash.filter';

export const useSearch = <T extends Record<string, any>>(
  initialData: T[],
  searchKeys: (keyof T)[]
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(initialData);
    } else {
      const queryWords = searchQuery.toLowerCase().trim().split(/\s+/);
      const filtered = filter(initialData, (item) =>
        queryWords.every((word) =>
          searchKeys.some((key) =>
            String(item[key] || '').toLowerCase().includes(word)
          )
        )
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, initialData]);

  const handleSearch = (query: string) => setSearchQuery(query);

  return { searchQuery, handleSearch, filteredData };
};
