import Movie from "./Movie";

const MovieList = ({movies, selectedMovie, onSelect}) => {
    return <ul className="list list-movies">
    {movies?.map((movie, i) => (
      <Movie movie={movie} key={movie.imdbID} selectedMovie={selectedMovie} onSelect={onSelect}/>
    ))}
  </ul>
 };
 
 export default MovieList;