import { useHttp } from "../hooks/http.hooks";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();
  const _basis = "https://gateway.marvel.com:443/v1/public/characters";
  const _apiKey = "apikey=7aee92fdbe4f8e13d3e13670a06c2326";
  const _basisComics = "https://gateway.marvel.com:443/v1/public/comics";

  const _offset = 210;

  const getAllCharacters = async (offset = _offset) => {
    const res = await request(`${_basis}?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_basis}/${id}?&${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = _offset) => {
    const res = await request(
      `${_basisComics}?limit=8&offset=${offset}&apikey=7aee92fdbe4f8e13d3e13670a06c2326`
    );

    return res.data.results.map(_transformComics);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      issueNumber: comics.issueNumber,
      title: comics.title,
      price: comics.prices[0].price,
      url: comics.urls[0].url,
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
  };
};
export default useMarvelService;
