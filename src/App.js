import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import NumResults from "./components/NumResults";
import Search from "./components/Search";
import MoviesList from "./components/MoviesList";
import Box from "./components/Box";
import WatchedSummary from "./components/Summary";
import WatchedList from "./components/WatchedList";
import Loader from "./components/Loader";
import ErrorMsg from "./components/ErrorMsg";
import MovieDetails from "./components/MovieDetails";
import useMovies from "./useMovies";
import useLocalStorage from "./useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, loading, error] = useMovies(
    query,
    useCallback(() => {
      closeSelectedMovieHandler();
    }, [])
  );
  const [watched, setWatched] = useLocalStorage([], "watchedList");

  const selectedMovieHandler = (movieId) => {
    setSelectedMovie((saveId) => (saveId === movieId ? null : movieId));
  };
  const addToWatchList = (watchedMovie) => {
    setWatched((watchedList) => {
      return [...watchedList, watchedMovie];
    });
  };
  const deleteWatchedHandler = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };
  function closeSelectedMovieHandler() {
    setSelectedMovie(null);
  }
  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {!loading && !error && (
            <MoviesList
              movies={movies}
              onSelectedMovie={selectedMovieHandler}
            />
          )}
          {loading && <Loader />}
          {error && <ErrorMsg message={error} />}
        </Box>
        <Box>
          {selectedMovie ? (
            <MovieDetails
              selectedMovie={selectedMovie}
              onCloseSelectedMovie={closeSelectedMovieHandler}
              onAddToWatchList={addToWatchList}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={deleteWatchedHandler}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
