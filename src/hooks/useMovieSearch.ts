import React, { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, filter, map, merge, of, switchMap } from 'rxjs';
import { getMovieRequest, IResponseData } from '../Api';
import { IMoviesData } from '../App';

interface IhandleSearchValue {
  (event: React.FormEvent<HTMLInputElement>): BehaviorSubject<string> | void
}

interface IuseMovieSearch {
  ({ setSearchValue, setMoviesData }: {
    setSearchValue: Dispatch<SetStateAction<string>>,
    setMoviesData: Dispatch<SetStateAction<IMoviesData>>
  }): { handleSearchValue: IhandleSearchValue }
}

const useMovieSearch: IuseMovieSearch = ({ setSearchValue, setMoviesData }) => {
  const [subject, setSubject] = useState<BehaviorSubject<string> | null>(null);

  const handleSearchValue: IhandleSearchValue = useCallback(
    (event) => {
    if (subject) {
      setSearchValue(event.currentTarget.value)
      return subject.next(event.currentTarget.value);
    }
  }, [subject, setSearchValue]);

  useEffect(() => {
    if (!subject) {
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
            of({ loading: true }),
            getMovieRequest(movie)
            .then((res: IResponseData) => {
              return !res.error
                ? {
                    movies: res.data ?? [],
                    loading: false,
                    errorMessage: '',
                  }
                : {
                    movies: [],
                    loading: false,
                    errorMessage: res.error,
                  }
            }),
          ),
        ),
        catchError((err) => of({
          movies: [],
          loading: false,
          errorMessage: err,
        })),
      ).subscribe((newState) => {
        setMoviesData((prevState: IMoviesData) => ({...prevState, ...newState}));
      });

      return () => { 
        observable.unsubscribe();
        subject.unsubscribe();
      };
    }
  }, [handleSearchValue, setMoviesData, subject]);

  return { handleSearchValue };
}

export default useMovieSearch;
