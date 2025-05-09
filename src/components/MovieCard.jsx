import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons"
import { faEye as eyeSolid } from "@fortawesome/free-solid-svg-icons"
import { faEye as eyeRegular } from "@fortawesome/free-regular-svg-icons"
import { setMovieState } from "../utils/utils"

const FALLBACK_URL = "https://image.tmdb.org/t/p"

const MovieCard = ({
  movie,
  setCurrentMovie,
  config,
  alreadyFavorited,
  alreadyWatched,
}) => {
  const [isFavorite, setIsFavorite] = useState(alreadyFavorited)
  const [isWatched, setIsWatched] = useState(alreadyWatched)
  if (!movie) return null

  const base_url =
    config && config.images ? config.images.base_url : FALLBACK_URL
  const url = `${base_url}/w185${movie.poster_path}`

  const addFavorite = async (e) => {
    e.stopPropagation()
    const body = JSON.stringify({
      media_type: "movie",
      media_id: movie.id,
      favorite: !isFavorite,
    })
    const url = `https://api.themoviedb.org/3/account/${
      import.meta.env.VITE_ACCOUNT_ID
    }/favorite`

    setMovieState(url, body, setIsFavorite)
  }

  const addWatched = async (e) => {
    e.stopPropagation()
    const body = JSON.stringify({
      media_type: "movie",
      media_id: movie.id,
      watchlist: !isWatched,
    })
    const url = `https://api.themoviedb.org/3/account/${
      import.meta.env.VITE_ACCOUNT_ID
    }/watchlist`

    setMovieState(url, body, setIsWatched)
  }

  useEffect(() => {
    setIsFavorite(alreadyFavorited)
  }, [alreadyFavorited])

  useEffect(() => {
    setIsWatched(alreadyWatched)
  }, [alreadyWatched])

  return (
    <div className="movie-card" onClick={() => setCurrentMovie(movie)}>
      <div className="movie-card-icons">
        <FontAwesomeIcon
          icon={isWatched ? eyeSolid : eyeRegular}
          color={isWatched ? "blue" : "#888"}
          onClick={(e) => addWatched(e)}
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
