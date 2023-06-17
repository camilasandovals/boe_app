import { Form, Button, Container, Row, Col} from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import Login from "../components/LoginForm";

export default function Signup() {
    return(
        <AppLayout>
            <h1 style={{color:"black"}}>Sign up</h1>
            <Login />
        </AppLayout>
    )
}