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
                
            <a href="https://www.instagram.com/boepartners/" target="_blank" rel="noreferrer">
                <Instagram size={20} style={{marginRight:20}}/>
            </a>
            <a href="https://www.facebook.com/boepartners" target="_blank" rel="noreferrer">
                <Facebook size={20} style={{marginRight:20}}/> 
            </a>
            <a href="https://www.linkedin.com/company/bringing-opportunities-everywhere/about/" target="_blank" rel="noreferrer">
                <Linkedin size={20} />
            </a>
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