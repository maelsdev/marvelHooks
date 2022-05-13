import "./charInfo.scss";
import { Component } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };
  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }
  componentDidUpdate(prevProps) {
    if (this.props.selectedChar !== prevProps.selectedChar) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { selectedChar } = this.props;
    if (!selectedChar) {
      return;
    }
    this.onCharLoading();
    this.marvelService
      .getCharacter(selectedChar)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;
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
  }
}

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

      <ul className="char__comics-list">
        {char.comics.length > 0 ? null : "Comics is not Aviable"}
        {char.comics.map((item, i) => {
          // eslint-disable-next-line
          if (i > 9) return;
          return (
            <li className="char__comics-item" key={i}>
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  selectedChar: PropTypes.number,
};

export default CharInfo;
