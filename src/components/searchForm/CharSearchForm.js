import "./charSearchForm.scss";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";

const CharSearchForm = () => {
  return (
    <Formik
      initialValues={{ charName: "" }}
      validationSchema={Yup.object({
        charName: Yup.string().required("Enter the name"),
      })}
    >
      <div className="char__search-form">
        <Form>
          <label className="char__search-label" htmlFor="charName">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            />

            <button type="submit" className="button button__main">
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage
            component="div"
            className="char__search-error"
            name="charName"
          />
        </Form>
      </div>
    </Formik>
  );
};

export default CharSearchForm;
