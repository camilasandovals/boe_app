import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import { useContext } from "react";
import { UserContext } from "../App";
import SubscribeModal from "../components/SubscribeModal";

export default function Profile() {
    const [user, setUser] = useContext(UserContext)

    return(
        <AppLayout>
            <Container className="profile">
                <Row>
                    <Col>
                        <h1>Account</h1>
                        
                    </Col>
                </Row>
                <Row>
                    <p>{user?.email}</p>
                    {user.image? <img src={user.image} alt="User profile" /> : <img src="/images/user-avatar.png" alt="Default user image" />}
                    <SubscribeModal />
                </Row>
            </Container>
        </AppLayout>
    )
}