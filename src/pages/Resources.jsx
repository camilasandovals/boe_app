import { Button, Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import CarouselEvents from "../components/CarouselEvents";
import CarouselSchools from "../components/CarouselSchools";
import CardBlog from "../components/CardBlog";
import { useNavigate } from "react-router-dom";
import SignModal from "../components/SignModal";

export default function Resources() {
    const navigate = useNavigate()
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
                        <div className="exclusive-container" >
                            <div className="exclusive-image-container" >
                                <img src="/images/Guidecover.png" alt="A guide to careers in the skilled trades" />
                            </div>
                            <div className="exclusive-text-container">
                                <h4>Sign in to unlock</h4>
                                <div className='text-center'>
                                <button className='button-class m-2 mb-3' onClick={() => navigate("/login")}>
                                    Sign in
                                </button>
                                <button className='button-class m-2 mb-3' onClick={() => navigate("/signup")}>
                                    Sign up
                                </button>
                                </div>
                            </div>
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