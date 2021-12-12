import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [validPassword, setValidPassword] = useState("");

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
      setValidEmail("Email is not valid");
      return false;
    }
    return true;
  };

  const passwordValidation = () => {
    if (!password) {
      setValidPassword("Password is not valid");
      return false;
    }
    return true;
  };

  const login = () => {
    if (emailValidation() && passwordValidation()) {
      axios
        .post("http://localhost:3002/login", {
          email,
          password,
        })
        .then((user) => {
          console.log(user.data);
          setEmail("");
          setPassword("");
          localStorage.setItem("auth_token", user.data.accessToken);
        })
        .catch((err) => {
          console.log(err, "Login error");
        });
    }
  };

  return (
    <div>
      <Container>
        <h3 className="mt-3 mb-3 d-flex justify-content-center">Login User</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-danger">{validEmail}</span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-danger">{validPassword}</span>
          </Form.Group>
          <Button variant="primary" onClick={login}>
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
