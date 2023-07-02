import { Col, Row, Form } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";

export default function Footer() {
    return(
        <footer className="footer">
        <div className="footer-container">
            <div className="footer-subscribe">
                <p><strong>Never miss a moment with us...</strong></p>
                <div className="subscription-container">
                <Form.Control className="me-auto" placeholder="Add your email here..." />
                <button className="button-class">Subscribe</button>
                </div>
            </div>
            <div >
                
                <Instagram size={20} style={{marginRight:20}}/> 
                <Facebook size={20} style={{marginRight:20}}/> 
                <Linkedin size={20} />
            </div>
            <div >
                <small><strong>Contact us</strong></small>
                <small>305-903-2980</small>
                <small>786-281-8944</small>
                <small>info@boepartners.com</small>
            </div>
            </div>
        </footer>
    )
}