// TODO: call the config endpoint to get the base URL
const BASE_URL = "https://image.tmdb.org/t/p/w185"

const MovieCard = ({ movie, setCurrentMovie }) => {
  if (!movie) return null

  return (
    <div className="movie-card" onClick={() => setCurrentMovie(movie)}>
      <img src={`${BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <div className="movie-title">{movie.title}</div>
      <div className="movie-rating">Rating: {movie.vote_average}</div>
    </div>
  )
}

export default MovieCard
