import { Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import LoginForm from "../components/LoginForm"
import { useContext } from "react";
import { UserContext } from "../App";


export default function Login() {
   const [user, setUser] = useContext(UserContext)
   
   const endpoint = "api/signup"
    return(
        <AppLayout>
            <div className="login">
                <h1>Sign up as User</h1>
                <p>Are you part of the South Florida community and looking to explore career opportunities that don't require a 4-year degree?
                    Create your BOE account today and start connecting with programs near you.</p>
                <p>Already a member? <a href="/login"><strong>Login</strong></a></p>
                <LoginForm endpoint= {endpoint} setUser ={setUser}/>
                <p>Are you a vocational school or apprenticeship program in South Florida?</p>
                <p>
                    <a href="/members/signup"><strong>Sign up here to create a BOE Member account</strong></a>
                </p>
            </div>
        </AppLayout>
    )
}