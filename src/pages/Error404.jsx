import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";

export default function Error404(){
    return(
        <AppLayout>
            <Container>
                <Row>
                    <Col>
                        <h1>404</h1>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    )
}