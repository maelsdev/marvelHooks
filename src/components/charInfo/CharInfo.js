import "./charInfo.scss";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [props.selectedChar]);

  const updateChar = () => {
    const { selectedChar } = props;
    if (!selectedChar) {
      return;
    }
    clearError();
    getCharacter(selectedChar).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    console.log(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const content = !(loading || error || !char) ? <Char char={char} /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  return (
    <div className="char__info">
      {skeleton}
      {content}
      {errorMessage}
      {spinner}
    </div>
  );
};

const Char = ({ char }) => {
  const imgStyle =
    char.thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "fill" }
      : null;
  return (
    <>
      <div className="char__basics">
        <img src={char.thumbnail} alt={char.name} style={imgStyle} />
        <div>
          <div className="char__info-name">{char.name}</div>
          <div className="char__btns">
            <a href={char.homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={char.wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {char.description === ""
          ? "Decription is not Aviable"
          : char.description}
      </div>
      <div className="char__comics">Comics:</div>
    </>
  );
};

CharInfo.propTypes = {
  selectedChar: PropTypes.number,
};

export default CharInfo;
