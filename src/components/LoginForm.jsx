import { Form, Button} from "react-bootstrap";
import AppLayout from "../layout/AppLayout";

export default function Login() {
    return(
            <Form className="form" >
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <button className="button-class" type="submit">
                    Submit
                </button>
            </Form>
    )
}