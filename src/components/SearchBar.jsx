import { useEffect, useRef } from "react";

const SearchBar = ({query, setQuery}) => {

  let inputElm = useRef(null);
    useEffect(()=>{
      document.addEventListener("keydown", (e)=>{
        if(e.code === "Enter"){
          inputElm.current.focus();
        };
      });
    }, []);

    return <div className="search-bar">
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputElm}
  />

    </div>
}

export default SearchBar;