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
import "./LogIn.css";


// Actions
import { login } from "../redux/actions/loginActions";

const Login = () => {
    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    ///Login
    const clickHandler = () => {
        dispatch(login(inputEmailData, inputPasswordData))
        axios.post('/user/login', { email: inputEmailData, password: inputPasswordData })
            .then(function (response) {

                //Token 
                const rawToken = response.data.token;
                localStorage.setItem('userToken', rawToken);
                setIsLoggedIn(true);
                //Login State
                // setLogin(!!rawToken);

                //Retrieve the todo list 
                console.log("login Successfull");
                addToCart();
                alert("You Are Now Logged In")

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
    let inputEmailData = "";
    let inputPasswordData = "";

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
                {!isLoggedIn &&
                    <i className="fas fa-sign-in-alt"></i>
                }
                <span>
                    <form>

                        {!isLoggedIn &&
                            <label>
                                <span className="spacing">Login:</span>
                                <input className="spacing" type="text" class="input" placeholder="Email" onChange={inputEmailHandler} />
                                <input className="spacing" type="password" class="input" placeholder="Password" onChange={inputPasswordHandler} />
                            </label>
                        }
                        {!isLoggedIn &&
                            <Link className="links" onClick={clickHandler}>Submit</Link>
                        }

                        {isLoggedIn &&
                            <Logout />
                        }

                        {!isLoggedIn &&
                            <Link className="links" onClick={registerHandler}>Register</Link>
                        }

                    </form>
                </span>
            </Link>

        </li>

    )
}

export default Login
