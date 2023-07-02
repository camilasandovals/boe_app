import { Col, Row, Form } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";

export default function Footer() {
    return(
        <footer className="footer">
        <div className="footer-container">
            <div>
                
                <h4>Never miss a moment with us...</h4>
                <div className="subscription-container">
                <Form.Control className="me-auto" placeholder="Add your email here..." />
                <button className="button-class">Subscribe</button>
                </div>
            </div>
            <div >
                {/* <p><strong>Social media</strong></p> */}
                <Instagram size={30} style={{marginRight:20}}/> 
                <Facebook size={30} style={{marginRight:20}}/> 
                <Linkedin size={30} />
            </div>
            <div >
                <p><strong>Contact us</strong></p>
                <p>305-903-2980</p>
                <p>786-281-8944</p>
                <p>info@boepartners.com</p>
            </div>
            </div>
        </footer>
    )
}