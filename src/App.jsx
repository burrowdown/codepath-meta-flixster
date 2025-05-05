import { useState } from "react"
import MovieList from "./components/MovieList"
import "./App.css"

const App = () => {
  const [sortBy, setSortBy] = useState("title")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchTermInput, setSearchTermInput] = useState("")

  return (
    <div className="App">
      <header className="title">
        <h1>Flixster</h1>
      </header>
      <nav>
        <div className="app-nav">
          <span className="active">Now Playing</span>
          <span>Watched</span>
          <span>Favorites</span>
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
              <option value="release-date">Release Date</option>
              <option value="rating">Rating</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </nav>
      <main>
        <MovieList sortBy={sortBy} searchTerm={searchTerm} />
      </main>
      <footer>
        <p>© 2025 Flixster</p>
      </footer>
    </div>
  )
}

export default App
