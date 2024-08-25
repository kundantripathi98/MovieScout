import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import Summary from "./components/Summary";
import WatchList from "./components/WatchList";
import MovieList from "./components/MovieList";
import StarRating from "./components/StarRating";
import Loader from "./components/Loader";
import ErrorComponent from "./components/ErrorComponent";
import SearchBar from "./components/SearchBar";
import MovieDetails from "./components/MovieDetails";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const KEY = "8de227e4";
  const [isSame, setIsSame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  

  useEffect(() => {
    async function fetchData() {
      
      try {
        setError("")
        setIsLoading(true)
        let res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        let data = await res.json();
        setMovies(data.Search);

        if(!res.ok){
          setMovies([]);
          throw new Error("Failed to load");
        }

        if (data.Response === "False") {
          setMovies([]);
          throw new Error("Movie Not Found, Try again or check spelling ");
        }    
      }
      catch (err) {
        setError(err.message);
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
    fetchData()
  }, [query]);

  function handleSelection(movie) {
    setSelectedMovie(selected => selected?.imdbID === movie.imdbID ? null : movie);
  }

  function handleBackBtn(){
    setSelectedMovie(null);
  }

  function handleWatchedDeletion(id){
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

    return (
      <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </Navbar>

      <Main>
        <Box>
          {query.length < 3 && <p className="loader">Your movies will show here!</p>}
          {isLoading && <Loader/>}
          {!isLoading && !error && <MovieList movies={movies} selectedMovie={selectedMovie} watched={watched} onSelect={handleSelection}/>}
          {error && <ErrorComponent error={error}/>}
        </Box>

        <Box>
          {selectedMovie ? <MovieDetails KEY={KEY} selectedMovie={selectedMovie} onBackBtn={handleBackBtn} isLoading={isLoading} watched={watched} setWatched={setWatched}/> :
          <>
            <Summary watched={watched}/>

            <WatchList watched={watched} onDelete={handleWatchedDeletion}/>
          </>
          }
        </Box>
      </Main>
      </>
    );
}
