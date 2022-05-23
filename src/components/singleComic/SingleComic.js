import "./singleComic.scss";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const SingleComic = (props) => {
  const { getSingleComic, loading, error } = useMarvelService();
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const id = props.selectedComic ? props.selectedComic : 98446;
    getSingleComic(id).then(comicUpdate);
    // eslint-disable-next-line
  }, [props.selectedComic]);

  const comicUpdate = (comics) => {
    setComics(comics);
  };

  const content = !(loading || error) ? <View comics={comics} /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !error ? <Spinner /> : null;

  return (
    <div className="single-comic">
      {content}
      {errorMessage}
      {spinner}
    </div>
  );
};

const View = ({ comics }) => {
  return (
    <>
      <img
        src={comics.thumbnail}
        alt={comics.title}
        className="single-comic__img"
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comics.title}</h2>
        <p className="single-comic__descr">{comics.description}</p>
        <p className="single-comic__descr">{comics.pageCount} pages</p>
        <p className="single-comic__descr">Language: {comics.language}</p>
        <div className="single-comic__price">
          {comics.price ? comics.price : "not aviable"}$
        </div>
      </div>
      <a href="/" className="single-comic__back">
        Back to all
      </a>
    </>
  );
};

export default SingleComic;
