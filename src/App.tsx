import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { IMovie } from './mockData';
import MoviesList from './components/MoviesList';
import { getMovieRequest } from './Api';
import MoviesListHeading from './components/MoviesListHeading';
import SearchBox from './components/SearchBox';


const App: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[] | []>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchValue = useCallback((value: string) => {
    setSearchValue(value)
  }, []);


  useEffect(() => {
    getMovieRequest()
      .then((res) => {
        if (!res.error) {
          setMovies(res);
        }
      })
  }, [])

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <section>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MoviesListHeading heading='Movies' />
          <SearchBox value={searchValue} handleOnChange={handleSearchValue} />
        </div>
        <div className='container-fluid movie-app'>
          <MoviesList movies={movies} />
        </div>
      </section>
    </div>
  );
}

export default App;
