import axios from "axios";
import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS} from "../constants/orderConstants";
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