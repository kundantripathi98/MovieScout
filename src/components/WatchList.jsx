import WatchedMovie from "./WatchedMovie";

const WatchList = ({watched}) => {
    return <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbID}/>
    ))}
  </ul>
}

export default WatchList;