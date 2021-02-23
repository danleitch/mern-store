import React from 'react'
import { Link } from "react-router-dom";
import "./LogOut.css";

const Logout = () => {
    // LogOut
    const logoutHandle = () => {
        localStorage.clear();
        window.location.reload();
        alert("You Have Successfully logged Out")
    }

    return (

        <Link className="links" onClick={logoutHandle} >Logout</Link>
    )
}

export default Logout
