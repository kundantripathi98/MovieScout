import WatchedMovie from "./WatchedMovie";

const WatchList = ({watched, onDelete}) => {
    return <ul className="list">
    {watched && watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbID} onDelete={onDelete}/>
    ))}
  </ul>
}

export default WatchList;