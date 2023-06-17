import { Form, Button, Row} from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import LoginForm from "../components/LoginForm"

export default function Login() {
    return(
        <AppLayout>
            <Row className="login">
                <h1>Login</h1>
                <LoginForm />
            </Row>
        </AppLayout>
    )
}