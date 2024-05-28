import Movies from "./components/movies";
import useMovies from "./hooks/useMovies";
import useSearch from "./hooks/useSearch";
import "./App.css";
import { useState, useCallback } from "react";
import debounce from "just-debounce-it";



function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error } = useSearch()
  const {movies, getMovies, loading} = useMovies({search, sort})

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({search})
    }, 2000), []
  )


  const handleSubmit = (event) => {
    event.preventDefault()
    // const fields = new FormData(event.target) basic way
    // const fields = Object.fromEntries(new FormData(event.target))
    // const {query} = fields 
    getMovies({search})
  }


  const handleInputChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    // getMovies({search: newSearch})
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return ( 
    <div className="page">
      <header>
        <h1>Movie search</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              style={{
                border: '1px solid transparent',
                borderColor: error ? 'red' : 'transparent'
              }}
              value={search}
              onChange={handleInputChange}
              name="query"
              // ref={inputRef}
              placeholder="batman, star wars  ..."
            />
            <input type="checkbox" name="sorted" onChange={handleSort} checked={sort} />  
            <button>Search</button>
          </form>
          <p id="error-message">{error}</p>
      </header>

      <main>
      { loading ? (
        <p>Loading .....</p>
      ): (
        <Movies movies={movies} />
      )}
        
      </main>
    </div>
  );
}

export default App;
