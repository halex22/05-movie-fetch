const APIKEY = "f1cd7db5";

function concatApiQuery(query) {
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${APIKEY}`;
  return url;
}

export async function searchMovies ({ search }) {
  if (search === '') return null;

  try {
    const response = await fetch(concatApiQuery(search))
    const json = await response.json();
    const movies = json.Search
    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year
    }))
  } catch (e) {
    throw new Error('Error search movies')
  }
}
