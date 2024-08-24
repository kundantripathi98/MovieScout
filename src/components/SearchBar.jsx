const SearchBar = ({query, setQuery}) => {
    return <div className="search-bar">
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />

    </div>
}

export default SearchBar;