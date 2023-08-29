import { useEffect, useRef, useState } from "react";
import StarsRating from "./StarsRating";
import Loader from "./Loader";
import useKey from "../useKey";
const key = "f3e4cca5";

const MovieDetails = ({
  selectedMovie,
  onCloseSelectedMovie,
  onAddToWatchList,
  watched,
}) => {
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [userRating, setUserRating] = useState(0);
  const {
    Title: title,
    Actors: actors,
    Director: director,
    Genre: genre,
    Year: year,
    Plot: plot,
    Poster: poster,
    Released: released,
    imdbRating,
    Runtime: runtime,
  } = movieDetails;
  const countRef = useRef(0);
  console.log(movieDetails);
  useKey("Escape", onCloseSelectedMovie);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovie);

  const movieUserRating =
    isWatched &&
    watched.find((movie) => movie.imdbID === selectedMovie).userRating;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const res =
          await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${selectedMovie}
          `);
        const data = await res.json();
        // console.log(data);
        setMovieDetails(data);
      } catch (err) {
        console.log();
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [selectedMovie]);

  useEffect(() => {
    document.title = `Movie | ${title}`;
    // console.log(`Movie | ${title}`);
    return () => {
      document.title = "usePopcorn";
      //   console.log(`${title} Movie un mounted`);
    };
  }, [title]);

  const AddToWatchListHandler = () => {
    const movie = {
      imdbID: selectedMovie,
      title,
      year,
      poster,
      imdbRating,
      runtime: +runtime.split(" ").at(0),
      userRating,
      countedRef: countRef.current,
    };
    onAddToWatchList(movie);
    onCloseSelectedMovie();
  };

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <button className="btn-back" onClick={onCloseSelectedMovie}>
            &larr;
          </button>
          <header>
            <img
              src={
                poster !== "N/A"
                  ? poster
                  : "https://t4.ftcdn.net/jpg/03/07/43/57/360_F_307435761_Du5if9SS1xxdJfbwPRhv6UfyvMnkU1GY.jpg"
              }
              alt={`Poster of ${title}`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p style={{ textAlign: "center" }}>
                  You rated this movie with {movieUserRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarsRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={AddToWatchListHandler}>
                      + Add to watchlist
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
};
export default MovieDetails;
