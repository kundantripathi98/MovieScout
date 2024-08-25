import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const MovieDetails = ({KEY, selectedMovie, onBackBtn, isLoading, watched, setWatched}) => {
    const [movieDetail, setMovieDetail] = useState({});
    const [rating, setRating] = useState(null);
    let isWatched = watched?.map(movie => movie.imdbID).includes(selectedMovie.imdbID);
    let watchedUserRating = watched.find(movie => movie.imdbID === selectedMovie.imdbID)?.userRating;

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
    }, [selectedMovie]);

    useEffect(() => {
        if(!selectedMovie.Title) return;
        document.title = `MovieScout | ${selectedMovie.Title}`;

        return () => {
            document.title = "MovieScout | Start your Movie journey";
        }
    }, [selectedMovie]);

    useEffect(()=>{
        const favicon = document.querySelector("link[rel='icon']") || document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = selectedMovie.Poster;
        document.head.appendChild(favicon);

        return () => {
            favicon.href = 'data:image/png;base64,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';
        };
    }, [selectedMovie]);

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
                {isWatched ? <p className="rating-para">You gave this movie a rating of 🌟 {watchedUserRating}.</p>
                 :
                 <><StarRating color={"yellow"} size={"25px"} rating={rating} setRating={setRating}/>
                {rating && <button className="btn-add" onClick={handleClick}>Add to List</button>}</>
                 }
            </div>
            <p><em>{movieDetail.Plot}</em></p>
            <p>Starring:- {movieDetail.Actors}</p>
            <p>Directed by {movieDetail.Director}</p>
        </section></>}
    </div>
}

export default MovieDetails;