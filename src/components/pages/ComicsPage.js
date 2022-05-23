import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";
import { useState } from "react";
const ComicsPage = () => {
  const [selectedComic, setSelectedcomic] = useState(null);
  const onComicSelected = (id) => {
    setSelectedcomic(id);
  };

  return (
    <>
      <AppBanner />
      <ComicsList onComicSelected={onComicSelected} />
      <SingleComic selectedComic={selectedComic} />
    </>
  );
};

export default ComicsPage;
