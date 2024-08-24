import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    const [query, setQuery] = useState("");
    return <div className="search-bar">
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />

  <button >
    <FontAwesomeIcon icon={faMagnifyingGlass} />
    </button>
    </div>
}

export default SearchBar;