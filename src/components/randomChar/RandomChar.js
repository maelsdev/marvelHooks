import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";
import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  marvelService = new MarvelService();

  updateChar = () => {
    this.onCharLoading();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;
    const content = !(loading || error) ? <View char={char} /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    return (
      <div className="randomchar">
        {content}
        {errorMessage}
        {spinner}

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const style =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "fill" }
      : null;
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt={name}
        style={style}
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description === ""
            ? "Decription is not Aviable"
            : description.slice(0, 200) + "..."}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
