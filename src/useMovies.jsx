import { useEffect, useState } from "react";

const key = "f3e4cca5";

const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
    const controller = new AbortController();
    const fetchMoviesData = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query || "interstellar"}
          `,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (query.length > 0 && query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMoviesData();
    return () => {
      controller.abort();
    };
  }, [query, callback]);

  return [movies, loading, error];
};
export default useMovies;
