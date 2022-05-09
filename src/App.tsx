import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, filter, map, merge, Observer, of, switchMap } from 'rxjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { IMovie } from './mockData';
import MoviesList from './components/MoviesList';
import { getMovieRequest } from './Api';
import MoviesListHeading from './components/MoviesListHeading';
import SearchBox from './components/SearchBox';
import AddToFavourites from './components/AddToFavourites';


interface IMoviesData {
  movies: IMovie[];
  loading: boolean;
  errorMessage: string,
  noResults: boolean,
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
  const [subject, setSubject] = useState<BehaviorSubject<string> | null>(null);
  const [favourites, setFavourites] = useState<[] | IMovie[] >([]);

  const addFavouriteMovie = (movieId: string) => {
    const currentMovie = moviesData.movies.find(({ imdbID }) => imdbID === movieId)!;
		setFavourites([...favourites, currentMovie]);
	};

  const handleSearchValue = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    console.log({ event });
    if (subject) {
      setSearchValue(event.currentTarget.value)
      return subject.next(event.currentTarget.value);
    }
  }, [subject]);

  useEffect(() => {
    if (subject === null) {
      const sub = new BehaviorSubject('');
      setSubject(sub);
    } else {
      const observable = subject.pipe(
        map((movie: string) => movie.toLowerCase()),
        filter((movie: string) => movie.length >= 2),
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((movie: string) =>
          merge(
            of({ loading: true, errorMessage: '', noResults: false }),
            getMovieRequest(movie)
            .then((res: { error: string | boolean, data: IMovie[] | null }) => {
              console.log({ res });
              if (!res.error) {
                return {
                  movies: res.data ?? [],
                  loading: false,
                  noResults: res.data?.length === 0,
                }
              } else {
                return { errorMessage: res.error, loading: false }
              }
            }),
          )
        ),
        catchError((err) => of({
          loading: false,
          errorMessage: err,
        })),
      ).subscribe((newState) => {
        setMoviesData(s => Object.assign({}, s, newState));
      });

      return () => { 
        observable.unsubscribe();
        subject.unsubscribe();
      };
    }
  }, [subject]);

  console.log({ moviesData })

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <section>
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
          {!moviesData.noResults && !moviesData.errorMessage
            ? (<MoviesList
                  movies={moviesData.movies}
                  FavouriteComponent={AddToFavourites}
                  handleFavouritesClick={addFavouriteMovie}
                />)
            : 'NO RESULTS'}
        </div>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MoviesListHeading heading='Favourites' />
        </div>
        <div className='row'>
          <MoviesList
            movies={favourites}
            FavouriteComponent={AddToFavourites}
            handleFavouritesClick={() => {}}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
