import { Button, Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";

export default function Resources() {
    return(
        <AppLayout>
            <Container className="resources">
                <h1>Resources</h1>
                <Row>
                    <Col>
                        <h2>Upcoming events</h2>
                        <p>carousel</p>
                    </Col>
                    <Col>
                        <h2>Visit our blog</h2>
                        <p>carousel</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Visit our partner school</h2>
                    </Col>
                    <Col>
                        <h2>Exclusive content</h2>
                        <button>Create account</button>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    )
}