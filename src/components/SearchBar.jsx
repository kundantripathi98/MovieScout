import { useEffect, useRef } from "react";

const SearchBar = ({query, setQuery}) => {

  let inputElm = useRef(null);
    useEffect(()=>{
      let clickEvent = (e) => {
        if(document.activeElement === inputElm.current) return;

        if(e.code === "Enter"){
          inputElm.current.focus();
          setQuery("");
        };
      }

      document.addEventListener("keydown", clickEvent);

      return () => {
        document.removeEventListener("keydown", clickEvent);
      }
    }, [setQuery]);

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