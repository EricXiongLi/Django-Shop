import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const redirect = window.location.search ? window.location.search.split("=")[1] : "/"

  const userRegister = useSelector(state => state.userRegister)
  const {error, loading, userInfo} = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  }, [window.history, userInfo, redirect])


  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Password not match")
    } else {
      dispatch(register(name, email, password))

    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control requried type="password" placeholder="Enter Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control requried type="password" placeholder="Confirm Your Password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Register</Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account ? <Link to={redirect ? `/register?redirect=${redirect}` : '/login'}>
          Sign In
        </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
