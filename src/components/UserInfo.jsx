import { Form, Col, Row } from "react-bootstrap";
import { useState } from "react";

export default function UserInfo() {
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [city, setCity] = useState('')
const [state, setState] = useState('')

const array = ["cat", "dog", "bubu", "cat", "dog", "bubu"]
    return (
        <Form className="form-account" >
            <Form.Group className="m-2" >
                <div className="d-flex">
                    <Form.Control type="text" value={firstName} required={true} placeholder="Firstname"
                    onChange={(e) => {setFirstName(e.target.value)}}/>
                    <Form.Control type="text" value={lastName} required={true} placeholder="Lastname"
                    onChange={(e) => {setLastName(e.target.value)}}/>
                </div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <div className="d-flex">
                <Form.Control type="text" value={city} required={true} placeholder="City"
                onChange={(e) => {setCity(e.target.value)}}/>
                <Form.Select aria-label="Default select example">
                <option value="1">Florida</option>
                </Form.Select>
                </div>
                <Form.Select aria-label="Default select example">
                <option value="1">I'm seeking a job</option>
                <option value="2">I'm just browsing</option>
                <option value="3">I work at an organization that helps people with job placement or career search</option>
                <option value="4">I know someone that might be interested</option>
                </Form.Select>
                <Row>
                    {array.map((type, index) => (
                    <Col md={4} key={index}>
                        <Form.Check
                        inline
                        label={type}
                        name="group1"
                        type="checkbox"
                        id={`inline-checkbox-${index}`}
                        />
                    </Col>
                    ))}
                </Row>
            </Form.Group>
            <button className="button-class" type="submit">
                <strong>Submit</strong>
            </button>
        </Form>
    )
}