import { useEffect, useRef, useState } from "react"
import MovieCard from "./MovieCard"
import "./MovieList.css"

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const isMounted = useRef(false)
  const scrollPosition = useRef(0)

  const BASE_URL =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US"
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
    },
  }

  const fetchMovies = async (isLoadMore) => {
    try {
      const response = await fetch(`${BASE_URL}&page=${page}`, options)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setMovies((prevMovies) => [...prevMovies, ...data.results])
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    scrollPosition.current = window.scrollY
    setPage((prevPage) => prevPage + 1)
    setLoading(true)
  }

  useEffect(() => {
    if (isMounted.current) {
      fetchMovies()
    } else {
      isMounted.current = true
    }
  }, [page])

  useEffect(() => {
    // Restore the scroll position after movies are loaded
    if (!loading) {
      window.scrollTo(0, scrollPosition.current)
    }
  }, [loading])

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
  if (movies.length === 0) {
    return <div>No movies found</div>
  }
  return (
    <>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <button onClick={loadMore} className="load-more-button">
        Load More
      </button>
    </>
  )
}

export default MovieList
