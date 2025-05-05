import { useEffect, useState } from "react"
import "./MovieDetails.css"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const MOVIE_BASE_URL = "https://api.themoviedb.org/3/movie/"

const MovieDetails = ({ movieId, close }) => {
  // TODO: genres
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
    },
  }

  const fetchMovie = async () => {
    try {
      const response = await fetch(`${MOVIE_BASE_URL}${movieId}`, options)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setMovie(data)
      console.log(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setError(null)
    setMovie(null)
    close()
  }

  useEffect(() => {
    setError(null)
    setLoading(true)
    fetchMovie()
  }, [movieId])

  if (!movieId || !movie) return null
  if (loading) {
    return (
      <div className="loading">
        Loading...
        <img className="loading-spinner" src="/movie.png" alt="Loading" />
      </div>
    )
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <section className="modal-overlay">
      <div className="modal-content">
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={`Backdrop for ${movie.title}`}
        />
        <h2>{movie.title}</h2>
        <p className="overview">{movie.overview}</p>
        <p>
          <span className="label">Rating:</span> {movie.vote_average}
        </p>
        <p>
          <span className="label">Release Date:</span> {movie.release_date}
        </p>
        <p>
          <span className="label">Runtime:</span> {movie.runtime} minutes
        </p>
        <a href={`https://www.imdb.com/title/${movie.imdb_id}`}>
          {movie.title} on IMDB
        </a>
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </section>
  )
}

export default MovieDetails
