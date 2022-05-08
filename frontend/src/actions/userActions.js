import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from "../constants/userConstants";
import axios from "axios"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type:USER_LOGIN_REQUEST
    })
    const {data} = await axios.post("http://127.0.0.1:8000/api/users/login/",{'username':email, 'password':password},{
      headers:{
        'Content-type':'application/json'
      }
    })
    dispatch({
      type:USER_LOGIN_SUCCESS,
      payload:data
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch(error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data ? error.response.data.detail : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({
    type: USER_LOGOUT
  })
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type:USER_REGISTER_REQUEST
    })
    const {data} = await axios.post("http://127.0.0.1:8000/api/users/register/",{name, email, password},{
      headers:{
        'Content-type':'application/json'
      }
    })
    dispatch({
      type:USER_REGISTER_SUCCESS,
      payload:data
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch(error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data ? error.response.data.detail : error.message,
    })
  }
}