import "./MovieDetails.css"

const MovieDetails = ({ movie, close }) => {
  if (!movie) return null

  return (
    <section className="modal-overlay">
      <div className="modal-content">
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <button className="close-button" onClick={close}>
          Close
        </button>
      </div>
    </section>
  )
}

export default MovieDetails
