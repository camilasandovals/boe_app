import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import Subscribe from "../components/Subscribe";
import Carousel from "../components/CarouselSchools";
export default function About() {
    return(
        <AppLayout>
            <Container className= "about">
                <Row className="pb-5">
                    <Col lg={6}>
                    <h1>Connecting people to careers in the skilled trades</h1>
                    <p>You don't need a 4-year college degree in order to have a successful career. Bringing Opportunities Everywhere (BOE) gives you the information and resources you need in order to find <strong>jobs</strong> near you in <strong>construction, technology, aviation, and healthcare</strong>.</p>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <img className="about-image" src="/images/Guidecover.png" alt="Guide Cover" />
                    </Col>
                </Row>
                <Row className="pb-5">
                    <Col>
                    <h2>Can't afford college? No problem.</h2>
                    <p>Students enrolled in <strong>vocational schools</strong> and <strong>apprenticeship</strong> programs are finding financial success in their early 20s... without the student loan debt.</p>
                    </Col>
                    <Col lg={6} className="d-flex justify-content-center align-items-center">
                        <img className="about-image" src="/images/salaries.png" alt="Salary information" />
                    </Col>
                </Row>
                <Row className="pb-5">
                    <Col>
                        <h2>$50,000</h2>
                        <p>Typical tuition cost for a 4-year, public university in Florida</p>
                    </Col>
                    <Col>
                        <h2>$80,000+</h2>
                        <p>Expected salary for a skilled trade employee in South Florida</p>
                    </Col>
                    <Col>
                        <h2>$37,090</h2>
                        <p>Average federal student loan debt in the US</p>
                    </Col>
                </Row>
                <Row className="pb-5">
                    <Col className="d-flex justify-content-center align-items-center">
                        <img className="about-image" src="/images/BOE_Fair.png" alt="Boe members" />
                    </Col>
                    <Col lg={6}>
                    <h2>Who we are</h2>
                    <p>Bringing Opportunities Everywhere (BOE) was founded on the idea that not everyone needs a college degree in order to have a successful career. Skilled trade jobs are in high demand, and our goal is to connect people with the information and resources they need for a path to success. Get started in an industry of your choice such as construction, aviation, technology, or healthcare and earn a 6 figure salary before age 30, without the student loan debt.</p>
                    </Col>
                </Row>
                <Row className="pb-5">
                    <Col>
                    <h2>What we do</h2>
                    <p>BOE is your one-stop shop for becoming a skilled trade employee. We connect people with incredible training programs by partnering with over 25 vocational schools and apprenticeship programs. The best part? Everything we offer is free of charge.</p>
                    </Col>
                    <Col lg={6} className="d-flex justify-content-center align-items-center">
                        <img className="about-image" src="/images/BocaCode2.png" alt="Boca code members" />
                    </Col>
                </Row>
                <Row className="pb-5">
                    <Col className="d-flex justify-content-center align-items-center">
                        <img className="about-image" src="/images/Jimmie_Fair.JPG" alt="Jimmie" />
                    </Col>
                    <Col lg={6} >
                        <h2>Get involved</h2>
                        <p>
                        Create a free user account for access to exclusive BOE content including interviews with our partner schools, up-to-date cost information, and research about the best local opportunities throughout South Florida. If you are an organization that would like to partner with BOE for an event, feel free to contact us!
                        </p>
                    </Col>
                </Row>
                <Carousel />
                
            </Container>
        </AppLayout>
    )
}