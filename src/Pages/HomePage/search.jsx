import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleClear = () => {
    setQuery('');
    onSearch('');
  }

  return (
    <div className="search">
      <label htmlFor="query">Find transactions</label>
      <input
        type="text"
        name="query"
        id="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => onSearch(query)}>Search</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}

export default Search;