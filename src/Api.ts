export const getMovieRequest = async () => {
  const url = `http://www.omdbapi.com/?s=star wars&apikey=263d22d8`;

  const response = await fetch(url);
  const responseJson = await response.json();

  if (responseJson.Search) {
    return (responseJson.Search);
  }

  return response;
};