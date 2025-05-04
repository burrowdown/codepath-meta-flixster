import { useState } from "react"
import MovieList from "./components/MovieList"
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Flixster</h1>
        <nav>
          <ul>
            <li>Now Playing</li>
            <li>Watched</li>
            <li>Favorites</li>
          </ul>
        </nav>
        <div className="search">
          <input type="text" placeholder="Search for a movie..." />
          <button>Search</button>
        </div>
        <div className="filter">
          <label htmlFor="filter">Filter by:</label>
          <select id="sort" name="sort">
            <option value="title">Title</option>
            <option value="release-date">Release Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </header>
      <MovieList />
    </div>
  )
}

export default App
