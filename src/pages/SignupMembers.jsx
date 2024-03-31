import { Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import LoginForm from "../components/LoginForm"
import { useContext } from "react";
import { UserContext } from "../App";
import SignUpMemberForm from "../components/SignUpMemberForm";


export default function SignUpMembers() {
   const [user, setUser] = useContext(UserContext)
   
   const endpoint = "api/members/signup"
    return(
        <AppLayout>
            <div className="login">
                <h1>Sign up as Member</h1>
                <p>Are you a vocational school or apprenticeship program in South Florida? Create your BOE account today, connect with future students near you, and start getting more applicants.</p>
                <p>Already a member? <a href="/login"><strong>Login</strong></a></p>
                <SignUpMemberForm endpoint= {endpoint} setUser ={setUser}/>
            </div>
        </AppLayout>
    )
}