import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/SubscribeModal.css"

function SubscribeModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className='button-class' onClick={handleShow}>
        Subscribe
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Title><h3>Subscribe to BOE</h3></Modal.Title>
        <Modal.Body><p>info</p></Modal.Body>
        <div className='text-center'>
          <button className='button-class' onClick={handleClose}>
            Subscribe
          </button>
        </div>
          
      </Modal>
    </>
  );
}

export default SubscribeModal;