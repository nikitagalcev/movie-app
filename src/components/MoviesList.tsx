import React, { memo } from 'react'
import { IMovie } from '../App';

interface IMoviesListProps {
  movies: IMovie[];
  handleFavouritesClick: (imdbID: string) => void;
  children?: React.ReactNode;
}

const MoviesList: React.FC<IMoviesListProps> = memo(({
  movies,
  handleFavouritesClick,
  children
}) => {
  return (
    <ul className='row'>
      {movies.map(({ Poster, Title, imdbID }) => (
        <li key={imdbID} className='image-container col-sm d-flex justify-content-start m-3'>
          <img src={Poster} alt={`${Title} movie poster`} />
          <div
            onClick={() => handleFavouritesClick(imdbID)}
            className='overlay d-flex align-items-center justify-content-center'
          >
            {children}
          </div>
        </li> 
      ))}
    </ul>
  )
});

export default MoviesList;
