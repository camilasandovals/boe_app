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
                <h1>Sign up</h1>
                <LoginForm endpoint= {endpoint} setUser ={setUser}/>
            </Row>
        </AppLayout>
    )
}