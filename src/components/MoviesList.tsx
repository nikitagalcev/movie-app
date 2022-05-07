import React, { memo } from 'react'
import { IMovie } from '../mockData';

interface IMoviesListProps {
  movies: IMovie[];
}

const MoviesList: React.FC<IMoviesListProps> = memo(({
  movies
}) => {

  return (
    <ul className='row'>
      {movies.map(({ Poster, Title, imdbID }) => (
        <li key={imdbID} className='image-container d-flex col-sm justify-content-start m-3'>
          <img src={Poster} alt={`${Title} movie poster`} />
        </li> 
      ))}
    </ul>
  )
});

export default MoviesList;
