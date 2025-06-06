
import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    } else {
      onSearch(''); // Allows clearing search or handling empty input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-form" role="search" aria-label="Search medicines">
      <label htmlFor="medicine-search" className="sr-only">
        Search for medicine
      </label>
      <input
        id="medicine-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter medicine name (e.g., Amoxicillin)"
        aria-label="Medicine name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
