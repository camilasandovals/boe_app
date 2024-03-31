import { useState } from 'react';
import { Col, Row, Form } from "react-bootstrap";
import "../styles/SubscribeModal.css"

function Subscribe({subscribeMessage}) {
 const [email, setEmail] = useState('')

 const handleAddSubscriber = async(e) => {
  e.preventDefault();
  try {
    const response = await fetch(`http://localhost:3001/subscribe`, {
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
      <p><strong>{subscribeMessage}</strong></p>
      <Form  className="subscription-container" onSubmit={handleAddSubscriber}>
        <Row className="flex-column flex-md-row">
          <Col xs={12} md={9} className="my-2">
            <Form.Control type="email" value={email} required={true} placeholder="Add your email here.."
            onChange={(e) => {setEmail(e.target.value)}}/>
          </Col>
          <Col xs={12} md={3} className="my-2">
            <button className="button-class">Subscribe</button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Subscribe;