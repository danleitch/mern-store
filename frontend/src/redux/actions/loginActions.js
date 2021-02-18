import * as actionTypes from "../constants/loginConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch, getState) => {

  const { data } = await axios.post('http://localhost:5000/user/login', { email, password });

  dispatch({
    type: actionTypes.LOGIN,
    payload: {
      password: data.user.password,
      email: data.user.email,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};