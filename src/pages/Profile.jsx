import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import { useContext } from "react";
import { UserContext } from "../App";
import Subscribe from "../components/Subscribe";

export default function Profile() {
    const [user, setUser] = useContext(UserContext)

    return(
        <AppLayout>
            <Container className="profile">
                <Row>
                    <Col>
                        <h1>Account</h1>
                        <p>Subscribe to our newsletter for free entry to BOE's next event and updates on vocational training programs in South Florida!</p>
                    </Col>
                </Row>
                <Row>
                    <p>{user?.email}</p>
                    {user.image? <img src={user.image} alt="User profile" /> : <img src="/images/user-avatar.png" alt="Default user image" />}
                    <Subscribe />
                </Row>
            </Container>
        </AppLayout>
    )
}