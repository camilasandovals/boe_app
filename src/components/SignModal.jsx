import { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

function SignModal() {
  const [user, setUser] = useContext(UserContext)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  useEffect(() => {
    user ? setShow(false) : setShow(true) 
  }, [user]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className='sign-modal'>
        <Modal.Header closeButton>
        </Modal.Header>
        <h3 className='text-center'>You're signed out</h3>
        <Modal.Body><p className='text-center'>Sign in for the full experience</p></Modal.Body>
        <div className='text-center mb-4'>
          <button className='button-class m-2 ' onClick={() => navigate("/login")}>
            Sign in
          </button>
          <button className='button-class m-2' onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      </Modal>
    </>
  );
}

export default SignModal;
