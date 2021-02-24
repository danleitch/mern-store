import { useState, } from 'react';
import { Button, Modal } from 'react-bootstrap';



function Payment() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment💸</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Name on Card</h5>
                    <input type="text" class="input" placeholder="Jimi Hendrix" />
                    <br />
                    <h5>Card Number</h5>
                    <input type="text" class="input" placeholder="1255 1585 5825 1885" />
                    <br />
                    <h5>CCV</h5>
                    <input type="Text" class="input" placeholder="125" />
                    <h5>Expiry</h5>
                    <input type="Text" class="input" placeholder="02/24" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Back
              </Button>
                    <Button variant="primary" onClick={null}>
                        Pay
              </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
//render(<Register />)
export default Payment;
