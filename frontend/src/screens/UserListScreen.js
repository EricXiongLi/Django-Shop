import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, listUsers} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Table} from "react-bootstrap";
import {AiOutlineCheck, AiOutlineEdit} from "react-icons/ai"
import {BsFillTrashFill} from "react-icons/bs"
import {Link, useNavigate} from "react-router-dom";

const UserListScreen = () => {

	const dispatch = useDispatch()
	const navigate = useNavigate()


	const userList = useSelector(state => state.userList)
	const {loading, error, users} = userList
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin
	const userDelete = useSelector(state => state.userLogin)
	const {success: successDelete} = userDelete


	const deleteHandler = (id) => {
		if (window.confirm("Are you sure to delete this user ?")) {
			dispatch(deleteUser(id))
			window.location.reload()
		}
	}

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers())
		} else {
			navigate("/login")
		}
	}, [dispatch, navigate, successDelete])


	return (
		<div>
			<h1>Users</h1>
			{loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :
				<Table striped bordered hover responsive className="table-sm">
					<thead>
					<tr>
						<th>ID</th>
						<th>NAME</th>
						<th>EMAIL</th>
						<th>ADMIN</th>
						<th></th>
					</tr>

					</thead>

					<tbody>
					{users.map(user => (
						<tr key={user._id}>
							<td>{user._id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.isAdmin ? <AiOutlineCheck color="green"/> : <AiOutlineCheck color="red"/>}</td>
							<td>
								<Link to={`/admin/user/${user._id}`}>
									<Button variant="light" className="btn-sm">
										<AiOutlineEdit size="20"/>
									</Button>
								</Link>
								<Button variant="danger" className="btn-sm" onClick={() => {deleteHandler(user._id)}}>
									<BsFillTrashFill size="16"/>
								</Button>
							</td>
						</tr>))}
					< /tbody>
				</Table>}
		</div>
	);
};

export default UserListScreen;