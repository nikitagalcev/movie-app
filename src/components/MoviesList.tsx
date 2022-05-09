import React, { memo } from 'react'
import { IMovie } from '../mockData';

interface IMoviesListProps {
  movies: IMovie[];
  FavouriteComponent: React.FC,
  handleFavouritesClick: (imdbID: string) => void
}

const MoviesList: React.FC<IMoviesListProps> = memo(({
  movies,
  handleFavouritesClick,
  FavouriteComponent,
}) => {
  return (
    <ul className='row'>
      {movies.map(({ Poster, Title, imdbID }) => (
        <li key={imdbID} className='image-container d-flex col-sm justify-content-start m-3'>
          <img src={Poster} alt={`${Title} movie poster`} />
          <div
            onClick={() => handleFavouritesClick(imdbID)}
            className='overlay d-flex align-items-center justify-content-center'
          >
						<FavouriteComponent />
					</div>
        </li> 
      ))}
    </ul>
  )
});

export default MoviesList;
