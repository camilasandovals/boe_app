import UserInfo from "../components/UserInfo";
import AppLayout from "../layout/AppLayout";
import { Row } from "react-bootstrap";
export default function Account() {
    return (
        <AppLayout>
            <Row className="login">
                <h2>Complete your profile</h2>
                
                <UserInfo />
            </Row>
        </AppLayout>
    )
}