import { Col, Row } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";

export default function Footer() {
    return(
        <footer className="footer">
        <div className="footer-container">
            <div >
                <p><strong>Contact us</strong></p>
                <p>305-903-2980</p>
                <p>786-281-8944</p>
                <p>info@boepartners.com</p>
            </div>
            <div >
                {/* <p><strong>Social media</strong></p> */}
                <Instagram size={30} style={{marginRight:20}}/> 
                <Facebook size={30} style={{marginRight:20}}/> 
                <Linkedin size={30} />
            </div>
            <div>
                <h3>Subscribe to our newsletter</h3>
            </div>
            </div>
        </footer>
    )
}