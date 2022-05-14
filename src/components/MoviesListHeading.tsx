import React, { memo } from 'react'

interface IMoviesListHeadingProps {
  heading: string;
}

const MoviesListHeading: React.FC<IMoviesListHeadingProps> = memo(({
  heading,
}) => {
  return (
    <div className='col'>
      <h1>{heading}</h1>
    </div>
  );
});

export default MoviesListHeading;
