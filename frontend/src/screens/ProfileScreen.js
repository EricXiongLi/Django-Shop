import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import {listMyOrders} from "../actions/orderActions";
import {FaTimes} from "react-icons/fa";

const ProfileScreen = () => {

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [message, setMessage] = useState("")
	const dispatch = useDispatch()
	const navigate = useNavigate();

	const userDetails = useSelector(state => state.userDetails)
	const {error, loading, user} = userDetails

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const userUpdateProfile = useSelector(state => state.userUpdateProfile)
	const {success} = userUpdateProfile

	const orderListMy = useSelector(state => state.orderListMy)
	const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

	useEffect(() => {
		if (!userInfo) {
			navigate("/login")
		} else {
			if (!user || !user.name || success) {
				dispatch({type: USER_UPDATE_PROFILE_RESET})
				dispatch(getUserDetails("profile"))
				dispatch(listMyOrders())
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [dispatch, window.history, user, success])


	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage("Password not match")
		} else {
			dispatch(updateUserProfile({'id': user._id, name, email, password}))
			setMessage("")
		}
	}


	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader/>}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control required type="name" placeholder="Enter Name" value={name}
													onChange={(e) => setName(e.target.value)}>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control required type="email" placeholder="Enter Email" value={email}
													onChange={(e) => setEmail(e.target.value)}>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Enter Password" value={password}
													onChange={(e) => setPassword(e.target.value)}>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control type="password" placeholder="Confirm Your Password" value={confirmPassword}
													onChange={(e) => setConfirmPassword(e.target.value)}>
						</Form.Control>
					</Form.Group>
					<Button type="submit" variant="primary">Update profile</Button>
				</Form>
			</Col>

			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? <Loader/> : errorOrders ? <Message variant="danger">{errorOrders}</Message> :
					<Table striped responsive className="table-sm">
						<thead>
						<tr>
							<th>ID</th>
							<th>Date</th>
							<th>Total</th>
							<th>Paid</th>
							<th>Delievered</th>
							<th></th>
						</tr>
						</thead>

						<tbody>
						{orders.map(order => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>{order.totalPrice}</td>
								<td>{order.isPaid ? order.paidAt : <FaTimes color="red"/>}</td>
								<td>
									<Link to={`/order/${order._id}`}>
										<Button className="btn-sm">DETAILS</Button>
									</Link>
								</td>

							</tr>
						))}
						</tbody>
					</Table>
				}
			</Col>

		</Row>
	);
};

export default ProfileScreen;
