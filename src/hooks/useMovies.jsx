import { useMemo, useState, useCallback } from "react";
import { searchMovies } from "../services/fetchMovies.mjs";
import { useRef } from "react";

export default function useMovies({ search, sort  }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({search}) => {
    console.log('Creating getMovies function....')
    if (search === previousSearch.current) return 

    try {
      setLoading(true);
      setError(null);
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sortedMovies = useMemo(() => {

    return sort
  ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading };
}
