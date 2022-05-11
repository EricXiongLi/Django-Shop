import React, {useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../actions/cartActions";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault(dispatch(saveShippingAddress({address, city, postalCode, country})))
    navigate("/payment")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4/>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control required type="text" placeholder="Enter Address" value={address ? address : ""}
                        onChange={(e) => setAddress(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control required type="text" placeholder="Enter City" value={city ? city : ""}
                        onChange={(e) => setCity(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control required type="text" placeholder="Enter postalCode" value={postalCode ? postalCode : ""}
                        onChange={(e) => setPostalCode(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control required type="text" placeholder="Enter Country" value={country ? country : ""}
                        onChange={(e) => setCountry(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
