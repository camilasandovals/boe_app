import { Row} from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import LoginForm from "../components/LoginForm"
import { useContext } from "react";
import { UserContext } from "../App";


export default function Login() {
   const [user, setUser] = useContext(UserContext)
   
   const endpoint = "login"
    return(
        <AppLayout>
            <Row className="login">
                <h3>Kickstart a career in a skilled trade.</h3>
                <h2>Login</h2>
                <p>Already have an account? <a href="/signup"><strong>Sign up</strong></a></p>
                <LoginForm endpoint= {endpoint} setUser ={setUser}/>
            </Row>
        </AppLayout>
    )
}