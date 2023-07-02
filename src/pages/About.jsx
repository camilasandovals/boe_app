import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";

export default function About() {
    return(
        <AppLayout>
            <Container className= "about">
                <h1>About us</h1>
                <Row className="pb-5">
                    <Col lg={6}>
                    <h2>Who we are</h2>
                    <p>Bringing Opportunities Everywhere (BOE) was founded on the idea that not everyone needs a college degree in order to have a successful career. Skilled trade jobs are in high demand, and our goal is to connect people with the information and resources they need for a path to success. Get started in an industry of your choice such as construction, aviation, technology, or healthcare and earn a 6 figure salary before age 30, without the student loan debt.</p>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <img className="about-image" src="/images/BOE_Fair.png" alt="Boe members" />
                    </Col>
                </Row>
                <Row className="pb-5">
                    <Col lg={6} className="d-flex justify-content-center align-items-center">
                        <img className="about-image" src="/images/BocaCode2.png" alt="Boca code members" />
                    </Col>
                    <Col>
                    <h2>What we do</h2>
                    <p>BOE is your one-stop shop for becoming a skilled trade employee. We connect people withincredible training programs by partnering with over 25 vocational schools and apprenticeship programs. The best part? Everything we offer is free of charge.</p>
                    </Col>
                </Row>
                <Row className="pb-5">
                    <Col lg={6} >
                        <h2>Get involved</h2>
                        <p>
                        Create a free user account for access to exclusive BOE content including interviews with our partner schools, up-to-date cost information, and research about the best local opportunities throughout South Florida. If you are an organization that would like to partner with BOE for an event, feel free to contact us!
                        </p>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <img className="about-image" src="/images/Jimmie_Fair.JPG" alt="Jimmie" />
                    </Col>
                </Row>
                
            </Container>
        </AppLayout>
    )
}