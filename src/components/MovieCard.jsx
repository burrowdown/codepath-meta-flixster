import { useState } from "react"

// TODO: call the config endpoint to get the base URL
const BASE_URL = "https://image.tmdb.org/t/p/w185"

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={`${BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <div className="movie-title">{movie.title}</div>
      <div className="movie-rating">Rating: {movie.vote_average}</div>
    </div>
  )
}

export default MovieCard
