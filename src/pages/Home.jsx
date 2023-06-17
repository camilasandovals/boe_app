import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import SchoolListing from "../components/SchoolListing";
import Hero from "../components/Hero";

export default function Home() {
    return(
        <AppLayout>
            <Hero />
            <Container className="bg-warning">
                <Row>
                    <SchoolListing />
                    
                </Row>
            </Container>
        </AppLayout>
    )
}