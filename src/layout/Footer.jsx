import { Col, Row, Form } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";
import Subscribe from "../components/Subscribe";

export default function Footer() {
    return(
        <footer className="footer">
        <div className="footer-container">
            <div className="footer-subscribe">
                <Subscribe subscribeMessage={"Never miss a moment with us..."}/>
            </div>
            <div style={{paddingLeft: 10}}>
                
            <a href="https://www.instagram.com/boepartners/" target="_blank" rel="noreferrer">
                <Instagram size={20} style={{marginRight:20}}/>
            </a>
            <a href="https://www.linkedin.com/company/bringing-opportunities-everywhere/about/" target="_blank" rel="noreferrer">
                <Linkedin size={20} />
            </a>
            </div>
            <div style={{paddingLeft: 20}}>
                <small><strong>Contact Us</strong></small>
                <small>305-903-2980</small>
                <small>786-281-8944</small>
                <small>info@boepartners.com</small>
            </div>
            </div>
        </footer>
    )
}