import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";

export default function Profile() {
    return(
        <AppLayout>
            <Container className="profile">
                <Row>
                    <Col>
                        <h1>this is profile</h1>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    )
}