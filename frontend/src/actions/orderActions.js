import axios from "axios";
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS
} from "../constants/orderConstants";
import {CART_CLEAE_ITEMS} from "../constants/cartConstants";


export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST
		})

		const {
			userLogin: {userInfo}
		} = getState()

		const {data} = await axios.post(`http://127.0.0.1:8000/api/orders/add/`, order, {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		})

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data
		})

		dispatch({
			type: CART_CLEAE_ITEMS,
			payload: data
		})

		localStorage.removeItem("cartItems")

	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: error.response && error.response.data ? error.response.data.detail : error.message,
		})
	}
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST
		})

		const {
			userLogin: {userInfo}
		} = getState()

		const {data} = await axios.get(`http://127.0.0.1:8000/api/orders/${id}`, {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		})

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response && error.response.data ? error.response.data.detail : error.message,
		})
	}
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST
		})

		const {
			userLogin: {userInfo}
		} = getState()

		const {data} = await axios.put(`http://127.0.0.1:8000/api/orders/${id}/pay/`, paymentResult, {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		})

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: error.response && error.response.data ? error.response.data.detail : error.message,
		})
	}
}

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_MY_REQUEST
		})

		const {
			userLogin: {userInfo}
		} = getState()

		const {data} = await axios.get(`http://127.0.0.1:8000/api/orders/myorders/`, {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		})

		dispatch({
			type: ORDER_LIST_MY_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: ORDER_LIST_MY_FAIL,
			payload: error.response && error.response.data ? error.response.data.detail : error.message,
		})
	}
}