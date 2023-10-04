import React, { useEffect, useState } from "react";
import "./login.scss";
import { Alert, Form, Spinner, Toast } from "react-bootstrap";
import { iconLogo } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import CheckboxTitle from "components/checkbox-title";
import axios from "axios";
import { allRoutes } from "constants/allRoutes";
import { apiBase } from "apiBase";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.clear()
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await apiBase.post('login/user',
        {
          email: email,
          password: password,
        }
      );
      if(response.status === 200){
      const token = response.data.Token;
      console.log(response,'response')
      localStorage.setItem("token", token);
      console.log(toString(token),'token after login')
      onLoginSuccess();
      navigate(allRoutes.home);
    }
    } catch (error) {
      console.log("Login error:", error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="login">
        <div className="login-content">
          <div className="logo">
            <img src={iconLogo} alt="" />
          </div>
          <h1>Log in to your account</h1>
          <h5>Welcome back! Please enter your details.</h5>

          <Form className="mt-5" onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="box">
              <div className="check">
                <CheckboxTitle title="Remember for 30 days" />
              </div>
              <div className="forgot">
                <Link to="/">Forgot password</Link>
              </div>
            </div>

            {/* <div className="form-btn">
              <Link to="" className="btn" onClick={handleLogin}>
                Sign in{" "}
              </Link>
            </div> */}
            <div className="form-btn">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <Link to="" className="btn" onClick={handleLogin}>
                  Sign in
                </Link>
              )}
            </div>
          </Form>
          {error && (
            <Toast
              show
              onClose={() => setError(null)}
              delay={3000}
              autohide
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
            >
              <Toast.Header closeButton={true} className="text-danger">
                <strong>Error</strong>
              </Toast.Header>
              <Toast.Body>{error}</Toast.Body>
            </Toast>
          )}
        </div>
      </section>
    </>
  );
};

export default Login;
