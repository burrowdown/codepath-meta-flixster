const filterAndSort = (movies, sortBy, searchTerm) => {
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

  return filteredMovies
}

export { filterAndSort }
