import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../constants/userConstants";
import axios from "axios"
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type:USER_LOGIN_REQUEST
    })

    const {data} = await axios.post("http://127.0.0.1:8080/api/users/login/",{'username':email, 'passowrd':password},{
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
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    })
  }
}
