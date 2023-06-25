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
                        <h2>Exclusive content</h2>
                        <button className="button-class">Create account</button>
                    </Col>
                </Row>
                <Row>
                        <h2>Visit our blog</h2>
                        <CardBlog />
                </Row>
            </Container>
        </AppLayout>
    )
}