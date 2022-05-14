import { IMovie } from '../App';

const getMovieEndpoint: (movie: string) => string = (movie) => `http://www.omdbapi.com/?s=${movie}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

export interface IResponseData {
  data: null | IMovie[],
  error: string | null,
}

export const getMovieRequest = async (movie: string): Promise<IResponseData | never> => {
  const url = getMovieEndpoint(movie)

  const response = await fetch(url);

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson.Error
      ? {
          data: null,
          error: responseJson.Error
        }
      : {
          data: responseJson.Search,
          error: null,
        };
  }

 throw new Error("Something bad happend");
};