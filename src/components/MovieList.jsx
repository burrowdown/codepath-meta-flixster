import { useEffect, useRef, useState } from "react"
import MovieCard from "./MovieCard"
import "./MovieList.css"

const MovieList = ({ sortBy, searchTerm, currentPage, setCurrentMovie }) => {
  const [movies, setMovies] = useState([])
  const [moviesToDisplay, setMoviesToDisplay] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const scrollPosition = useRef(0)

  const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing?"

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
    },
  }

  const fetchMovies = async () => {
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
    fetchMovies()
  }, [page])

  // Restore the scroll position after movies are loaded
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, scrollPosition.current)
    }
  }, [loading])

  useEffect(() => {
    if (currentPage === "now-playing") {
      setMoviesToDisplay(movies)
    }
  }, [currentPage])

  // Filter and sort movies based on search term and sort criteria
  useEffect(() => {
    let filteredMovies = [...movies]

    if (searchTerm) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (sortBy === "title") {
      filteredMovies.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === "release-date") {
      filteredMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      )
    } else if (sortBy === "rating") {
      filteredMovies.sort(
        (a, b) => parseFloat(b.vote_average) - parseFloat(a.vote_average)
      )
    }

    setMoviesToDisplay(filteredMovies)
  }, [movies, sortBy, searchTerm])

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
    // TODO: why is this not showing up?
    return <div>No movies found</div>
  }
  return (
    <>
      <div className="movie-list">
        {moviesToDisplay.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            setCurrentMovie={setCurrentMovie}
          />
        ))}
      </div>
      <button onClick={loadMore} className="load-more-button">
        Load More
      </button>
    </>
  )
}

export default MovieList
