import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";

function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>DjangoShop</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/cart">
                <Nav.Link href="/cart">
                  <i className="fas fa-shopping-cart">Cart</i>
                </Nav.Link>
              </Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <Link to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                </NavDropdown>
              ) : (
                <Link to="/profile">
                  <Nav.Link><i className="fas fa-user"></i> Login </Nav.Link>
                </Link>
              )}

              <Link to="/login">
                <Nav.Link href="/login">
                  <i className="fas fa-user">Login</i>
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
