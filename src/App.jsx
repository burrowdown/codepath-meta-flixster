import { useState } from "react"
import MovieList from "./components/MovieList"
import "./App.css"

const App = () => {
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
            <input type="text" placeholder="Search for a movie..." />
            <button>Search</button>
          </div>
          <div className="filter">
            <label htmlFor="filter">Filter by: </label>
            <select id="sort" name="sort">
              <option value="title">Title</option>
              <option value="release-date">Release Date</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </nav>
      <main>
        <MovieList />
      </main>
      <footer>
        <p>© 2025 Flixster</p>
      </footer>
    </div>
  )
}

export default App
