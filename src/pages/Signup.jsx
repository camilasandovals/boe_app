import { Row} from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import LoginForm from "../components/LoginForm"
import { useContext } from "react";
import { UserContext } from "../App";


export default function Login() {
   const [user, setUser] = useContext(UserContext)
   
   const endpoint = "signup"
    return(
        <AppLayout>
            <Row className="login">
                <h2>Looking to start a career in a skilled trade?</h2>
                <p>Already a member? <a href="/login"><strong>Login</strong></a></p>
                <LoginForm endpoint= {endpoint} setUser ={setUser}/>
            </Row>
        </AppLayout>
    )
}