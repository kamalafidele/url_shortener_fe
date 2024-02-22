import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from '../components/ErrorMessage';
import urlsApi from "../api/urls";
import ClientContext from '../contexts/index';
import COLOR_PALETTE from "../constants/colors";

const validationSchema = Yup.object().shape({
  originalUrl: Yup.string().required().label("URL"),
  expirationDate: Yup.string().required().label("Expiration date")
});

function AddUrl({ isOpen, closeModal }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { urls, setUrls } = useContext(ClientContext);

  const handleAddUrl = async ({ originalUrl, expirationDate }) => {
    setLoading(true);
    const result = await urlsApi.addUrl(originalUrl, expirationDate);
    setLoading(false);

    if (!result.ok) return setError(result.data.error || result.data.status);

    setUrls([...urls, result.data.url ]);
    closeModal();
  };

  return (
    <Modal closeModal={(e) => closeModal() } isOpen={isOpen}>
      <h3 style={{ textAlign: "center", color: COLOR_PALETTE.PRIMARY }}>Add New URL</h3>
      <Formik
        initialValues={{
          originalUrl: "",
          expirationDate: "",
        }}
        onSubmit={(values) => handleAddUrl(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, setFieldTouched, touched, errors }) => (
          <div className="inputs-container">
            <div className="row">
              { error && <ErrorMessage text={error}/>}
            </div>
            <div className="row">
              <label htmlFor="client">Original URL</label>
              <Input
                placeHolder={"Original link"}
                type={"text"}
                width={100}
                onChange={handleChange('originalUrl')}
                onBlur={() => setFieldTouched("originalUrl")}
              />
              { touched.originalUrl && <ErrorMessage text={errors.originalUrl}/> }
            </div>
            <div className="row">
              <label htmlFor="category">Expiration Date</label>
              <Input
                placeHolder={"Expiration time"}
                type={"date"}
                width={100}
                onChange={handleChange('expirationDate')}
                onBlur={() => setFieldTouched("expirationDate")}
              />
              { touched.expirationDate && <ErrorMessage text={errors.expirationDate}/> }
            </div>
            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                text={ loading ? 'Loading...' : "Shorten URL" }
                width={50}
                onClick={handleSubmit}
                type={"submit"}
              />
            </div>
          </div>
        )}
      </Formik>
    </Modal>
  );
}

export default AddUrl;
