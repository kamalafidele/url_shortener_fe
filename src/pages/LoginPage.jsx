import React, { useEffect, useState,  } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Logo from "../components/Logo";
import COLOR_PALETTE from "../constants/colors";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import authApi from "../api/auth";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    const result = await authApi.login(email, password);
    setLoading(false);

    if (!result.ok) return setError(result.data.status || result.data.error);

    authStorage.storeToken(result.data.jwt_token);
    navigate('/urls');
  };

  useEffect(() => {
    if (authStorage.getToken())  navigate('/urls');
  }, [navigate]);

  return (
    <Container>
      <div className="logo-container">
        <Logo font_size={40} onClick={() => navigate('/')}/>
      </div>
      <div className="details-container">
        <div>
          <h3 className="header-text" style={{ color: COLOR_PALETTE.GRAY }}>
            Welcome
          </h3>
          <h1 className="header-text">Login to URLShort</h1>
          <p className="header-text" style={{ color: COLOR_PALETTE.GRAY }}>
            Enter your email and password below
          </p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleLogin(values)}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldTouched,
            touched,
            errors,
          }) => (
            <div className="input-container">
              <div className="row" style={{ marginTop: 10, marginBottom: 10 }}>
                {error && <ErrorMessage text={error} />}
              </div>
              <div className="row">
                <label htmlFor="email">Email</label>
                <Input
                  type={"email"}
                  onChange={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  placeHolder={"Email adddress"}
                  width={100}
                />
                {touched.email && <ErrorMessage text={errors.email} />}
              </div>

              <div className="row">
                <label htmlFor="password">Password</label>
                <Input
                  type={"password"}
                  onChange={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  placeHolder={"Your  password"}
                  width={100}
                />
                {touched.password && <ErrorMessage text={errors.password} />}
              </div>

              <div className="row">
                <Button text={ loading ? 'Loading....' : "Log In"} width={100} onClick={handleSubmit} type='submit'/>
              </div>
            </div>
          )}
        </Formik>

        <div className="other-links">
          <p className="header-text" style={{ margin: "20px 0px 20px 0px" }}>
            Don't have an account? <a href="signup">Sign up</a>
          </p>
          <p className="header-text">
            Forgot your password/login <a href="reset">Reset</a>
          </p>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: ${COLOR_PALETTE.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;

  .logo-container {
    width: 30%;
  }
  .details-container {
    width: 40%;
    padding: 20px;
    border-radius: 10px;
    align-items: center;
    background-color: ${COLOR_PALETTE.WHITE};
    .header-text {
      text-align: center;
      margin: 10px 0px 10px 0px;
    }

    a {
      text-decoration: none;
    }
  }
`;
export default LoginPage;
