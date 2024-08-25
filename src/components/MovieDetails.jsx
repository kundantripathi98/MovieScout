import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const MovieDetails = ({KEY, selectedMovie, onBackBtn, isLoading, watched, setWatched}) => {
    const [movieDetail, setMovieDetail] = useState({});
    const [rating, setRating] = useState(null);
    let isWatched = watched?.map(movie => movie.imdbID).includes(selectedMovie.imdbID)
    console.log(isWatched);
    
    

    useEffect(()=>{
       async function fetchData(){
            try{
                let res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovie.imdbID}`);
                let data = await res.json(); 
                console.log(data);  
                setMovieDetail(data)
            }
            catch (err) {
                console.log(err);  
            }
        };

        fetchData();
    }, [selectedMovie])

    function handleClick(){
        
        let newWatchedMovie = {
            imdbID: movieDetail.imdbID,
            Title: movieDetail.Title,
            Year: movieDetail.Year,
            Poster: movieDetail.Poster,
            runtime: movieDetail.Runtime.split(" ").slice(0,1),
            imdbRating: movieDetail.imdbRating,
            userRating: rating,
          }
        
        setWatched(watchlist => {
            onBackBtn();
            if(watchlist.some(movie => movie.imdbID === newWatchedMovie.imdbID)){
                return watchlist;
            }
            else{
                return [...watchlist, newWatchedMovie];
            }
        });
    }

    return <div className="details">
        {isLoading? <Loader/> : <>
            <header>
            <div className="btn-back" onClick={onBackBtn}><FontAwesomeIcon icon={faArrowLeftLong} /></div>
            <img src={movieDetail.Poster} alt={`Poster of ${movieDetail.Title}`} />

            <div className="details-overview">
                <h2>{movieDetail.Title}</h2>
                <p>{movieDetail.Released} &#8226; {movieDetail.Runtime}</p>
                <p>{movieDetail.Genre}</p>
                <p>Awards:- {movieDetail.Awards}</p>
                <p><span>⭐</span>{movieDetail.imdbRating} IMDb Rating</p>
                <p>Country:- {movieDetail.Country}</p>
            </div>
        </header>

        <section>
            <div className="rating">
            <div className="starRating-box"><StarRating color={"yellow"} size={"25px"} rating={rating} setRating={setRating}/>
            {rating && <button className="btn-add" onClick={handleClick}>Add to List</button>}</div>
                {/* {rating === 0 ? <div><StarRating color={"yellow"} size={"25px"} rating={rating} setRating={setRating}/>
                {rating && <button className="btn-add" onClick={handleClick}>Add to List</button>}</div> : <p>You gave this movie a rating of ⭐{rating}.</p>} */}
            </div>
            <p><em>{movieDetail.Plot}</em></p>
            <p>Starring:- {movieDetail.Actors}</p>
            <p>Directed by {movieDetail.Director}</p>
        </section></>}
    </div>
}

export default MovieDetails;