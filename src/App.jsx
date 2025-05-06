import { useEffect, useState } from "react"
import MovieList from "./components/MovieList"
import MovieDetails from "./components/MovieDetails"
import "./App.css"

// TODO: fetch favorites and watched movies

const App = () => {
  const [sortBy, setSortBy] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchTermInput, setSearchTermInput] = useState("")
  const [currentPage, setCurrentPage] = useState("now-playing")
  const [currentMovie, setCurrentMovie] = useState(null)
  const [genres, setGenres] = useState([])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSearchTerm("")
    setSearchTermInput("")
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
      },
    }
    const fetchGenres = async () => {
      const url = "https://api.themoviedb.org/3/genre/movie/list"
      const response = await fetch(url, options)
      const genreData = await response.json()
      setGenres(genreData.genres)
    }
    fetchGenres()
  }, [])

  return (
    <div className="App">
      <header className="title">
        <h1>Flixster</h1>
      </header>
      <nav>
        <div className="app-nav">
          <span
            onClick={() => handlePageChange("now-playing")}
            className={
              currentPage === "now-playing" && searchTerm === "" ? "active" : ""
            }
          >
            Now Playing
          </span>
          <span
            onClick={() => handlePageChange("watched")}
            className={currentPage === "watched" ? "active" : ""}
          >
            Watched
          </span>
          <span
            onClick={() => handlePageChange("favorites")}
            className={currentPage === "favorites" ? "active" : ""}
          >
            Favorites
          </span>
        </div>
        <div className="search-wrapper">
          <div className="search">
            <input
              value={searchTermInput}
              type="text"
              placeholder="Search for a movie..."
              onChange={(e) => setSearchTermInput(e.target.value)}
            />
            <button onClick={() => setSearchTerm(searchTermInput)}>
              Search
            </button>
          </div>
          <div className="sort">
            <label htmlFor="sort">Sort by: </label>
            <select
              id="sort"
              name="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="" disabled>
                ---
              </option>
              <option value="release-date">Release Date</option>
              <option value="rating">Rating</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </nav>
      <main>
        <MovieList
          sortBy={sortBy}
          searchTerm={searchTerm}
          currentPage={currentPage}
          setCurrentMovie={setCurrentMovie}
        />
      </main>
      <footer>
        <p>© 2025 Flixster</p>
      </footer>
      <MovieDetails
        movieId={currentMovie ? currentMovie.id : null}
        genres={genres}
        close={() => setCurrentMovie(null)}
      />
    </div>
  )
}

export default App
