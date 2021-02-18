import React from 'react'

const Logout = () => {
    // LogOut
    const logoutHandle = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <button onClick={logoutHandle}>Logout</button>
    )
}

export default Logout
