import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const ComicsList = (props) => {
  const { getAllComics, loading, error } = useMarvelService();

  const [offset, setOffset] = useState(210);
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setComicsEnded((comicsEnded) => ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li
          className="comics__item"
          key={i}
          onClick={(id) => props.onComicSelected(item.id)}
        >
          <a href="#">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">`${item.price}$`</div>
          </a>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderItems(comicsList);
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="comics__list">
      {items}
      {spinner}
      {errorMessage}
      <button
        className="button button__main button__long"
        style={{ display: comicsEnded ? "none" : "block" }}
        disabled={newItemLoading}
      >
        <div className="inner" onClick={() => onRequest(offset)}>
          load more
        </div>
      </button>
    </div>
  );
};

export default ComicsList;
