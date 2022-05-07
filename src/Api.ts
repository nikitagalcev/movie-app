const API_KEY = '263d22d8';
const getMovieEndpoint: (movie: string) => string = (movie) => `http://www.omdbapi.com/?s=${movie}&apikey=${API_KEY}`;

export const getMovieRequest = async (movie: string) => {
  const url = getMovieEndpoint(movie)

  const response = await fetch(url);

  if (response.ok) {
    const responseJson = await response.json();
    console.log({ responseJson });
    return responseJson.Error
      ? {
        data: null,
        error: responseJson.Error
      }
      : {
        error: false,
        data: responseJson.Search
      };
  }

 throw new Error("Something bad happend");
};