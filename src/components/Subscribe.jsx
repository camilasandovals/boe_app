import { useState } from 'react';
import { Col, Row, Form } from "react-bootstrap";
import "../styles/SubscribeModal.css"

function Subscribe() {
 const [email, setEmail] = useState('')

 const handleAddSubscriber = async(e) => {
  e.preventDefault();
  try {
    const response = await fetch(`http://localhost:3000/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.message) {
      alert(data.message);
      return;
    }
    
  } catch (err) {
    alert(err);
  }
  };

   return (
    <>
      <p><strong>Never miss a moment with us...</strong></p>
      <Form  className="subscription-container" onSubmit={handleAddSubscriber}>
      <Form.Control type="email" value={email} required={true} placeholder="Add your email here.."
      onChange={(e) => {setEmail(e.target.value)}}/>
      <button className="button-class">Subscribe</button>
      </Form>
    </>
  );
}

export default Subscribe;