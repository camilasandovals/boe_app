import { useState } from 'react';
import { Col, Row, Form } from "react-bootstrap";
import "../styles/SubscribeModal.css"

function Subscribe() {
 const [email, setEmail] = useState('')

   return (
    <>
      <p><strong>Never miss a moment with us...</strong></p>
      <Form  className="subscription-container" >
      <Form.Control type="email" value={email} required={true} placeholder="Add your email here.."
      onChange={(e) => {setEmail(e.target.value)}}/>
      <button className="button-class">Subscribe</button>
      </Form>
    </>
  );
}

export default Subscribe;