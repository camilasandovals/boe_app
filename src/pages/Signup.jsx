import { Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import LoginForm from "../components/LoginForm"
import { useContext } from "react";
import { UserContext } from "../App";


export default function Login() {
   const [user, setUser] = useContext(UserContext)
   
   const endpoint = "signup"
    return(
        <AppLayout>
            <div className="login">
                <h3>Looking to start a career in a skilled trade?</h3>
                <h2>Sign up</h2>
                <p>Already a member? <a href="/login"><strong>Login</strong></a></p>
                <LoginForm endpoint= {endpoint} setUser ={setUser}/>
            </div>
        </AppLayout>
    )
}