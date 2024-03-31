import { Row} from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import LoginForm from "../components/LoginForm"
import { useContext } from "react";
import { UserContext } from "../App";


export default function Login() {
   const [user, setUser] = useContext(UserContext)
   
   const endpoint = "api/login"
    return(
        <AppLayout>
            <div className="login">
                <h1>Login</h1>
                <p>Welcome Back!</p>
                <LoginForm endpoint= {endpoint} setUser ={setUser}/>
                <p>Don't have an account? <a href="/signup"><strong>Sign up</strong></a></p>
            </div>
        </AppLayout>
    )
}