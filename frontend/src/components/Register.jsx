import { useState, } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";


function Register() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);


    const clickHandler = () => {
        axios.post('http://localhost:3000/user/login', { email: inputEmailData, password: inputPasswordData })
            .then(function (response) {

                //Token 
                const rawToken = response.data.token;
                localStorage.setItem('userToken', rawToken);


                //Login State
                // setLogin(!!rawToken);

                //Retrieve the todo list 
                console.log("login Successfull");

            })
            // handle error
            .catch(function (error) {
                console.error(error + "Sumting wrong mr with da post");
            });

    }


    // Login Data Handlers Variables
    let inputEmailData = "";
    let inputPasswordData = "";
    // Login Data Handlers
    const inputEmailHandler = (e) => {
        const rawInputData = (e.target.value);
        inputEmailData = rawInputData
    }

    const inputPasswordHandler = (e) => {
        const rawInputData = (e.target.value);
        inputPasswordData = rawInputData
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register for Shopping🛒</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Email</h4>
                    <input type="text" class="input" placeholder="Email" onChange={inputEmailHandler} />
                    <br />
                    <br />
                    <h4>Password</h4>
                    <input type="password" class="input" placeholder="Password" onChange={inputPasswordHandler} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
              </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
              </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
//render(<Register />)
export default Register;
