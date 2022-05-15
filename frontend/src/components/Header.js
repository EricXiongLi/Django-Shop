import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";
import {BiLogIn} from "react-icons/bi"
import {AiOutlineShoppingCart} from "react-icons/ai"

function Header() {
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin
	const dispatch = useDispatch()
	const navigate = useNavigate()


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
									<AiOutlineShoppingCart size="16"/>CART
								</Nav.Link>
							</Link>

							{userInfo ? (
								<NavDropdown title={userInfo.name} id="username">
									<NavDropdown.Item onClick={() => navigate("/profile")}>
										Profile
									</NavDropdown.Item>
									<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

								</NavDropdown>
							) : (
								<Link to="/profile">
									<NavDropdown.Item onClick={() => navigate("/login")}>
										<BiLogIn>Login</BiLogIn>
									</NavDropdown.Item>
								</Link>
							)}

							{userInfo && userInfo.isAdmin && (
								<NavDropdown title="Admin" id="admin menu">
									<NavDropdown.Item onClick={() => navigate("/admin/userlist")}>
										Users
									</NavDropdown.Item>
									<NavDropdown.Item onClick={() => navigate("/admin/productlist")}>
										Products
									</NavDropdown.Item>
									<NavDropdown.Item onClick={() => navigate("/admin/orderslist")}>
										Orders
									</NavDropdown.Item>
								</NavDropdown>
							)}

						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
