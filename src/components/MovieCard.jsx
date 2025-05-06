import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons"
import { faEye as eyeSolid } from "@fortawesome/free-solid-svg-icons"
import { faEye as eyeRegular } from "@fortawesome/free-regular-svg-icons"

const FALLBACK_URL = "https://image.tmdb.org/t/p"

const MovieCard = ({ movie, setCurrentMovie, config }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isWatched, setIsWatched] = useState(false)
  if (!movie) return null

  const base_url =
    config && config.images ? config.images.base_url : FALLBACK_URL
  const url = `${base_url}/w185${movie.poster_path}`

  const addFavorite = async (e) => {
    e.stopPropagation()
    try {
      const url = `https://api.themoviedb.org/3/account/${
        import.meta.env.VITE_ACCOUNT_ID
      }/favorite`
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movie.id,
          favorite: !isFavorite,
        }),
      }
      const response = await fetch(url, options)
      if (!response.ok) throw new Error("Network response was not ok")
      const json = await response.json()
      if (json.status_code === 1 || json.status_code === 12) {
        setIsFavorite(true)
      } else if (json.status_code === 13) {
        setIsFavorite(false)
      } else {
        throw new Error(`Unexpected status code: ${json.status_code}`)
      }
    } catch (error) {
      console.error("Error adding favorite:", error)
    }
  }

  return (
    <div className="movie-card" onClick={() => setCurrentMovie(movie)}>
      <div className="movie-card-icons">
        <FontAwesomeIcon
          icon={isWatched ? eyeSolid : eyeRegular}
          color={isWatched ? "blue" : "#888"}
        />
        <FontAwesomeIcon
          icon={isFavorite ? heartSolid : heartRegular}
          color={isFavorite ? "red" : "#888"}
          onClick={(e) => addFavorite(e)}
        />
      </div>
      <img src={url} alt={`poster for ${movie.title}`} />
      <div className="movie-title">{movie.title}</div>
      <div className="movie-rating">Rating: {movie.vote_average}</div>
    </div>
  )
}

export default MovieCard
