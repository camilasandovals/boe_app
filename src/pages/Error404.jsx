import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";

export default function Error404(){
    return(
        <AppLayout>
            <Container style={{height: "80vh", textAlign: "center"}}>
                <Row>
                    <Col>
                        <h1>Error 404</h1>
                        <h2>Page not found</h2>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    )
}