//import { useState } from 'react';
import * as actionTypes from "../redux/constants/cartConstants";
import { Link } from "react-router-dom";
//import axios from "axios";
import Register from './Register';
import { render } from '@testing-library/react';
import axios from "axios";
import Logout from './Logout';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";

// Actions
import { login } from "../redux/actions/loginActions";




const Login = () => {
    const dispatch = useDispatch();

    ///Login
    const clickHandler = () => {
        dispatch(login(inputEmailData, inputPasswordData))
        axios.post('/user/login', { email: inputEmailData, password: inputPasswordData })
            .then(function (response) {

                //Token 
                const rawToken = response.data.token;
                localStorage.setItem('userToken', rawToken);
                //Login State
                // setLogin(!!rawToken);

                //Retrieve the todo list 
                console.log("login Successfull");
                addToCart();

            })
            // handle error
            .catch(function (error) {
                console.error(error + "Problem on Post");
             });

    }



    const addToCart = (id, qty) => async (dispatch, getState) => {
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
                product: data._id,
                name: data.name,
                imageUrl: data.imageUrl,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            },
        });

        localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    };



    // Login Data Handlers Variables
    let inputEmailData = "dan@gmail.com";
    let inputPasswordData = "yesplease123";

    const inputEmailHandler = (e) => {
        const rawInputData = (e.target.value);
        inputEmailData = rawInputData
        // setEmail(inputEmailData);
    }

    const inputPasswordHandler = (e) => {
        const rawInputData = (e.target.value);
        inputPasswordData = rawInputData
        //setPassword(inputPasswordData);
    }

    // Handle Modal 
    const registerHandler = () => {
        render(<Register />)
    }






    return (

        <li>
            <Link to="/" className="cart__link">
                <i className="fas fa-sign-in-alt"></i>
                <span>
                    <form>
                        <label>
                            Login:
                            <input type="text" class="input" placeholder="Email" onChange={inputEmailHandler} />
                            <input type="password" class="input" onChange={inputPasswordHandler} />
                        </label>
                        <input type="submit" value="Submit" onClick={clickHandler} />
                        <Logout />

                        <button onClick={registerHandler}>Register</button>

                    </form>
                </span>
            </Link>

        </li>

    )
}

export default Login
