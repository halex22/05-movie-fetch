/* eslint-disable react/prop-types */
function ListMovies({ movies }) {
  return (
    <>
      <ul className="movies">
        {movies.map((movie) => (
          <li className="movie" key={movie.id}>
              { movie.title?.length < 15 ? (
                <h3>{movie.title}</h3>
              ):(
                <h3>{movie.title.slice(0, 16)} ...</h3>
              )}
            <p style={{textAlign: "center"}}>{movie.year}</p>
            <img src={movie.poster} alt="" />
          </li>
        ))}
      </ul>
    </>
  );
}

function NotMovies() {
	return (
		<>
		<p>Not movies found </p>
		</>
	)
}

export default function Movies({movies}) {
	const hasMovies = movies?.length > 0;

	return (
		<>
		{hasMovies ? <ListMovies movies={movies} /> : <NotMovies />}
		</>
	)


}

