import {  Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import CarouselEvents from "../components/CarouselEvents";
import CarouselSchools from "../components/CarouselSchools";
import CardBlog from "../components/CardBlog";
import { useNavigate } from "react-router-dom";
import SignModal from "../components/SignModal";
import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function Resources() {
    const [user, setUser] = useContext(UserContext) 
    const navigate = useNavigate()
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleExclusiveContent = () => {
        if (!user) {
            showModal();
            return;
        }
        window.open("https://www.canva.com/design/DAFhOV5lswg/F01wp29lRxiILr2cgjes7g/view?utm_content=DAFhOV5lswg&utm_campaign=designshare&utm_medium=link&utm_source=homepage_design_menu", "_blank");
    };

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
                        <div className="exclusive-container" onClick={handleExclusiveContent}>
                            <div className="exclusive-image-container" >
                                <img src="/images/Guidecover.png" alt="A guide to careers in the skilled trades" />
                            </div>
                            <div style={{marginLeft:20, marginRight:20, marginTop:32}}>
                                {user? <p><strong>Download the guide</strong> </p> : <p><strong>Sign up to download</strong> </p> }
                                <p>BOE users have free access to exclusive content, updates on all our upcoming events, and get in touch with representatives from partner schools.</p>
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