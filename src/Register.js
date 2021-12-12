import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const navigate = useNavigate();

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

  const register = () => {
    if (emailValidation() && passwordValidation()) {
      axios
        .post("http://localhost:3002/register", {
          email,
          password,
        })
        .then((user) => {
          console.log(user.data);
          setEmail("");
          setPassword("");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err, "register error");
        });
    }
  };

  return (
    <div>
      <Container>
        <h3 className="mt-3 mb-3 d-flex justify-content-center">
          Register User
        </h3>
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
          <Button variant="primary" onClick={register}>
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
