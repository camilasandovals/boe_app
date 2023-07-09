import UserInfo from "../components/UserInfo";
import AppLayout from "../layout/AppLayout";
import { Row } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Account() {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    
    

    return (
        <AppLayout>
            <Row className="login">
                <h2>Complete your profile</h2>
                <UserInfo />
            </Row>
        </AppLayout>
    )
}