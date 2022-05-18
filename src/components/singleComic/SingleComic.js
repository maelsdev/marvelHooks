import "./singleComic.scss";

import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";

const SingleComic = (props) => {
  const { getSingleComic } = useMarvelService();
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const id = props.selectedComic ? props.selectedComic : 98446;
    getSingleComic(id).then(comicUpdate);
  }, [props.selectedComic]);

  const comicUpdate = (comics) => {
    setComics(comics);
    console.log(comics);
  };

  return (
    <div className="single-comic">
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
      <a href="#" className="single-comic__back">
        Back to all
      </a>
    </div>
  );
};

export default SingleComic;
