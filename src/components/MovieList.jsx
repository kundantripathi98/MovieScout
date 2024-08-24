import Movie from "./Movie";

const MovieList = ({movies}) => {
    return <ul className="list">
    {movies?.map((movie, i) => (
      <Movie movie={movie} key={movie.imdbID}/>
    ))}
  </ul>
 }
 
 export default MovieList;