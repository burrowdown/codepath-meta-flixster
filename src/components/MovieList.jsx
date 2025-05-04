import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setMovies(data.results)
        console.log(data.results)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])
  if (loading) {
    // TODO: something fancy here
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (movies.length === 0) {
    return <div>No movies found</div>
  }
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieList
