class MarvelService {
  _basis = "https://gateway.marvel.com:443/v1/public/characters";
  _apiKey = "apikey=7aee92fdbe4f8e13d3e13670a06c2326";

  _offset = 210;
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} status:${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._offset) => {
    const res = await this.getResource(
      `${this._basis}?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._basis}/${id}?&${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}
export default MarvelService;
