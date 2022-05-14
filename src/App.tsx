import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviesList from './components/MoviesList';
import MoviesListHeading from './components/MoviesListHeading';
import SearchBox from './components/SearchBox';
import AddToFavourites from './components/AddToFavourites';
import useMovieSearch from './hooks/useMovieSearch';

export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IMoviesData {
  movies: IMovie[];
  loading: boolean;
  errorMessage: string,
};

const initData = {
  movies: [],
  loading: true,
  errorMessage: '',
  noResults: false,
};

const App: React.FC = () => {
  const [moviesData, setMoviesData] = useState<IMoviesData>(initData);
  const [searchValue, setSearchValue] = useState<string>('');
  const [favourites, setFavourites] = useState<[] | IMovie[] >([]);
  const { handleSearchValue } = useMovieSearch({ setSearchValue, setMoviesData });

  const addFavouriteMovie = (movieId: string) => {
    const currentMovie = moviesData.movies.find(({ imdbID }) => imdbID === movieId)!;
		setFavourites([...favourites, currentMovie]);
    saveToLocalStorage([...favourites, currentMovie]);
	};

  const removeFavouriteMovie = (movieId: string) => {
    const newFavourites = favourites.filter(({ imdbID }) => movieId !== imdbID);
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites)
  };

  const saveToLocalStorage = (items: IMovie[]) => {
		localStorage.setItem('movie-app-favourites', JSON.stringify(items));
	};

  useEffect(() => {
		const movieFavourites = JSON.parse(
      localStorage.getItem('movie-app-favourites') ?? '{}'
      );

		setFavourites(movieFavourites);
	}, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>One more movie app, yes</h1>
      </header>

      <div className='row'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MoviesListHeading heading='Movies' />
          <SearchBox
            value={searchValue}
            loading={moviesData.loading}
            handleOnChange={handleSearchValue}
          />
        </div>

        <div className='container-fluid movie-app'>
          {moviesData.errorMessage ? <span>{moviesData.errorMessage}</span> : null}
          {moviesData.movies.length && !moviesData.errorMessage ? (
            <MoviesList
              movies={moviesData.movies}
              handleFavouritesClick={addFavouriteMovie}
            >
              <AddToFavourites/>
            </MoviesList>) : <span>NO RESULTS</span>}
        </div>

        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MoviesListHeading heading='Favourites' />
          {favourites.length ? (
          <div className='container-fluid movie-app'>
            <MoviesList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
            >
              <AddToFavourites isInAddMode={false} />
            </MoviesList>
          </div>
        ) : <span>Add some movies</span>}
        </div>
      </div>
    </div>
  );
}

export default App;
