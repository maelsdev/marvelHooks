import "./charList.scss";
import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class CharList extends Component {
  state = {
    charList: [],
    loading: false,
    error: false,
    offset: 210,
    newItemsLoading: false,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.newItemsLoading();
  }

  newItemsLoading = (offset) => {
    this.onCharLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoading = () => {
    this.setState({ newItemsLoading: true });
  };
  onCharLoaded = (newCharlist) => {
    let ended = false;
    if (newCharlist.length < 9) {
      ended = true;
    }
    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharlist],
      loading: true,
      newItemsLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  getItems = (charlist) => {
    const items = charlist.map((item) => {
      const itemStyle =
        item.id === this.props.selectedChar
          ? "char__item char__item_selected"
          : "char__item";
      const imgStyle =
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
          ? { objectFit: "fill" }
          : null;

      return (
        <li
          className={itemStyle}
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return items;
  };

  onError = (charList) => {
    this.setState({ error: true, loading: false });
  };

  render() {
    const { charList, loading, error, offset, newItemsLoading, charEnded } =
      this.state;

    const items = this.getItems(charList);
    const spinner = !(loading || error) ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
      <div className={"char__list "}>
        {spinner}
        {errorMessage}
        <ul className="char__grid">{items}</ul>
        <button
          className="button button__main button__long"
          disabled={newItemsLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.newItemsLoading(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
 