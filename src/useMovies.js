import { useEffect, useState } from "react";

export function useMovies(query, callback){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let controller = new AbortController();
        const signal = controller.signal;
    
        async function fetchData() { 
            const KEY = "8de227e4";
          try {
            setError("")
            setIsLoading(true)
            let res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal});
            let data = await res.json();
            setMovies(data.Search);
    
            if(!res.ok){
              setMovies([]);
              throw new Error("Failed to load");
            }
    
            if (data.Response === "False") {
              setMovies([]);
              setError("");
              throw new Error("Movie Not Found, Try again or check spelling ");
            } 
          }
          catch (err) {
            if(err.name !== "AbortError"){
              setError(err.message);
            }
          }
          finally{
            setIsLoading(false);
          }
        }
    
        if(query.length < 3){
              setMovies([]);
              setError('');
              return;
        }
    
        callback?.();
        fetchData()
    
        return ()=>{
          controller.abort();
        }
      }, [query]);

      return {movies, isLoading, error};
}