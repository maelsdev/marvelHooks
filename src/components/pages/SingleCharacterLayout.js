import "./singleCharacterLayout.scss";
import { useParams, Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

const SingleCharacterLayout = () => {
  const characterId = useParams();
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();
  const charId = characterId.characterId;

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, []);

  const updateChar = () => {
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <>
      {<AppBanner />}
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail } = char;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
      <Link to="/" className="single-characters__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleCharacterLayout;