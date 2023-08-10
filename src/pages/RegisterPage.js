import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";
import { Button } from "react-bootstrap";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import RegisterForm from "components/auth/RegisterForm";

const Register = () => {
  const history = useHistory();
  const location = useLocation();

  const firstName =
    location?.search &&
    qs.parse(location.search, { ignoreQueryPrefix: true })?.first;
  const lastName =
    location?.search &&
    qs.parse(location.search, { ignoreQueryPrefix: true })?.last;
  const email =
    location?.search &&
    qs.parse(location.search, { ignoreQueryPrefix: true })?.email;

  return (
    <Layout navLinks={[]}>
      <div className="d-flex flex-column justify-content-center container align-items-center">
        <div className="p-3 mt-4">
          <h3>
          Welcome to the distinguished Transitional Legal Client Portal.
          </h3>
          <br></br>
          <p>
          A sophisticated platform designed to empower you with a comprehensive view of your case's progress.<br></br>
          </p>
        </div>
        <div className="d-flex justify-content-center container align-items-center">
          <Card
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ flex: 1, maxWidth: "40rem" }}
          >
            <RegisterForm
              initialValues={{ firstName, lastName, email }}
            />
            <Button
              block
              variant="link"
              className="mt-2"
              onClick={() => history.push("/login")}
            >
              Have an account? Log In
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
