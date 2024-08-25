const Summary = ({watched}) => {
  const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const add = (add) => add.reduce((acc, cur, i, add) => Number(acc) + Number(cur), 0);
  
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(2);
  const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(2);
  const totalRuntime = add(watched.map((movie) => movie.runtime));

    return <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{totalRuntime} min</span>
      </p>
    </div>
  </div>
}

export default Summary;