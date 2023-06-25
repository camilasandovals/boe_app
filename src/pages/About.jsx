import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";

export default function About() {
    return(
        <AppLayout>
            <Container className= "about">
                <h1>About us</h1>
                <Row>
                    <h2>Who we are</h2>
                    <p>Bringing Opportunities Everywhere (BOE) was founded on the idea that not everyone needs a college degree in order to have a successful career. Skilled trade jobs are in high demand, and our goal is to connect people with the information and resources they need for a path to success. Get started in an industry of your choice such as construction, aviation, technology, or healthcare and earn a 6 figure salary before age 30, without the student loan debt.</p>
                </Row>
                <Row>
                    <h2>What we do</h2>
                    <p>BOE is your one-stop shop for becoming a skilled trade employee. We connect people withincredible training programs by partnering with over 25 vocational schools and apprenticeship programs. The best part? Everything we offer is free of charge.</p>
                </Row>
                <Row>
                    <h2>Get involved</h2>
                    <p>
                    Create a free user account for access to exclusive BOE content including interviews with our partner schools, up-to-date cost information, and research about the best local opportunities throughout South Florida. If you are an organization that would like to partner with BOE for an event, feel free to contact us!
                    </p>
                </Row>
                
            </Container>
        </AppLayout>
    )
}