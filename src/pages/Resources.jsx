import {  Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import CarouselEvents from "../components/CarouselEvents";
import CarouselSchools from "../components/CarouselSchools";
import CardBlog from "../components/CardBlog";
import { useNavigate } from "react-router-dom";
import SignModal from "../components/SignModal";
import { useState } from "react";

export default function Resources() {
    const navigate = useNavigate()
    const [modalVisible, setModalVisible] = useState(false);
    
    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return(
        <AppLayout>
            <Container className="resources">
                <CarouselSchools />
        
                <Row>
                    <Col sm={12} md={12} lg={6}>
                        <h2>Upcoming events</h2>
                        <CarouselEvents />
                    </Col>
                    <Col>
                        <h2>Exclusive Content</h2>
                        <div className="exclusive-container" onClick={showModal}>
                            <div className="exclusive-image-container" >
                                <img src="/images/Guidecover.png" alt="A guide to careers in the skilled trades" />
                            </div>
                            <div style={{marginLeft:20, marginRight:20, marginTop:32}}>
                                <p><strong>Create your account</strong> </p>
                                <p>For free access to our exclusive content, updates on all our upcoming events, and to get in touch with representatives from our partner schools.</p>
                            </div>
                        </div>

                        {modalVisible && <SignModal onClose={hideModal} />}
                    </Col>
                </Row>
                <Row>
                        <h2>Blog Content</h2>
                        <CardBlog />
                </Row>
            </Container>
        </AppLayout>
    )
}