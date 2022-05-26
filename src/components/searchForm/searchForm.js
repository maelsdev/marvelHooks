// import { useState } from "react";
// import {
//   Formik,
//   Form,
//   Field,
//   ErrorMessage as FormikErrorMessage,
// } from "formik";
// import * as Yup from "yup";
// import { Link } from "react-router-dom";

// import useMarvelService from "../../services/MarvelService";
// import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  return (
    <div className="char__search-form">
      <form>
        <label className="char__search-label" htmlFor="charName">
          Or find a character by name:
        </label>
        <div className="char__search-wrapper">
          <input
            id="charName"
            name="charName"
            type="text"
            placeholder="Enter name"
          />
          <button type="submit" className="button button__main">
            <div className="inner">find</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharSearchForm;
