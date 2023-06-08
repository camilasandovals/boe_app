import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import SchoolListing from "../components/SchoolListing";

export default function Home() {
    return(
        <AppLayout>
            <header> 
                <div className="d-flex justify-content-center">
                        <div className="video-container">
                            <video autoPlay muted loop>
                            <source src="./images/video.mp4" type="video/mp4" /> 
                            </video>
                        </div>s
                </div>
                <Row>
                    <SchoolListing />
                </Row>
            </header>
        </AppLayout>
    )
}