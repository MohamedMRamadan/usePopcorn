const Movie = ({ movie, onSelectedMovie }) => {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://t4.ftcdn.net/jpg/03/07/43/57/360_F_307435761_Du5if9SS1xxdJfbwPRhv6UfyvMnkU1GY.jpg"
        }
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};
export default Movie;
