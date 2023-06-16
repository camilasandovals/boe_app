import { Form, Button} from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import LoginForm from "../components/LoginForm"

export default function Login() {
    return(
        <AppLayout>
            <LoginForm />
        </AppLayout>
    )
}