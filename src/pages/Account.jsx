import UserInfo from "../components/UserInfo";
import AppLayout from "../layout/AppLayout";
import { Row } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import MemberInfo from "../components/MemberInfo";
import Error404 from "./Error404";

export default function Account() {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
    } , [user])

    return (
        <AppLayout>
            <div className="account">
                { user?.type == "user"? (
                <UserInfo />
                ) : (
                <Error404 />
                )}
            </div>
        </AppLayout>
    )
}