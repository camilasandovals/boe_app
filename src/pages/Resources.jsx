import { Button, Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import CarouselEvents from "../components/CarouselEvents";
import CarouselSchools from "../components/CarouselSchools";
import CardBlog from "../components/CardBlog";

export default function Resources() {
    return(
        <AppLayout>
            <Container className="resources">
                <h1>Resources</h1>
                <CarouselSchools />
                <Row>
                    <Col sm={12} md={12} lg={6}>
                        <h2>Upcoming events</h2>
                        <CarouselEvents />
                    </Col>
                    <Col>
                        <h2>Exclusive Content</h2>
                        <div className="exclusive-container">
                            <div className="exclusive-text-container">
                            <div>
                                <h3>Benefits</h3>
                                <p>Exclusive content</p>
                                <p>Exclusive content</p>
                                <p>Exclusive content</p>
                            </div>
                            <div>
                                <p><strong>Create account to unlock</strong></p>
                                <button className="button-class">Create Account</button>
                            </div>
                            </div>
                            <img src="/images/Guidecover.png" alt="A guide to careers in the skilled trades" />
                        </div>
                    </Col>
                </Row>
                <Row>
                        <h2>Visit Our Blog</h2>
                        <CardBlog />
                </Row>
            </Container>
        </AppLayout>
    )
}