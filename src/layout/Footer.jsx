import { Col, Row } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";

export default function Footer() {
    return(
        <footer className="footer">
        <div className="container">
            <div className="row">
            <div className="col">
                <p><strong>Contact us</strong></p>
                <p>305-903-2980</p>
                <p>786-281-8944</p>
                <p>info@boepartners.com</p>
            </div>
            <div className="col">
                <p><strong>Social media</strong></p>
                <Instagram />
                <Facebook />
                <Linkedin />
            </div>
            </div>
        </div>
        </footer>
    )
}