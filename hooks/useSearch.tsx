import { useState, useEffect } from 'react';
import filter from 'lodash.filter';

export const useSearch = <T extends Record<string, any>>(
  initialData: T[],
  searchKeys: (keyof T)[],
  query: string,
  fetchData: (page: number, search: string, id?:string) => Promise<void>, // Pass fetchBuyers here
  id?:string,
) => {
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    // If the searchQuery is empty, fetch all data (or handle accordingly)
    if (query.trim() === '') {
      setFilteredData(initialData);
    } else {
      // Call fetchBuyers whenever searchQuery changes
      fetchData(1, query, id); // Adjust the page as needed
    }
  }, [query, initialData, fetchData]); // Depend on query and initialData

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredData(initialData);
    } else {
      const queryWords = query.toLowerCase().trim().split(/\s+/);
      const filtered = filter(initialData, (item) =>
        queryWords.every((word) =>
          searchKeys.some((key) =>
            String(item[key] || '').toLowerCase().includes(word)
          )
        )
      );
      setFilteredData(filtered);
    }
  }, [query, initialData]);

  return { filteredData };
};
