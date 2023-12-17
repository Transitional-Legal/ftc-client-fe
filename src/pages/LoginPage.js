import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "components/auth/Auth";
import Layout from "components/layout/Layout";
import LoginForm from "components/auth/LoginForm";
import Card from "components/Card";

const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const history = useNavigate();
  if (user) return <Navigate to="/" />;
  return (
    <Layout navLinks={[]}>
      <div className="d-flex justify-content-center container py-5 align-items-center">
        <Card
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ flex: 1, maxWidth: "40rem", minHeight: "30rem" }}
        >
          <h3>Transitional Legal Client Portal</h3>
          <LoginForm style={{ flex: undefined }} />
          <Button
            block
            variant="link"
            className="mt-2"
            onClick={() => history.push("/register")}
          >
            Don't have an account? Click here to register.
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
