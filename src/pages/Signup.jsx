import { Form, Button, Container, Row, Col} from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import Login from "../components/LoginForm";

export default function Signup() {
    return(
        <AppLayout>
            <Row className="login">
                <h1>Sign up</h1>
                <Login />
            </Row>
        </AppLayout>
    )
}