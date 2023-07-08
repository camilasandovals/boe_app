import { useContext, useState } from "react"
import { Form } from "react-bootstrap";
import SignModal from "./SignModal";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
export default function Apply() {
    const [user, setUser] = useContext(UserContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [state, setState] = useState('')
    const navigate = useNavigate('')

    const premiumApplication = async(e) => {
        e.preventDefault()
        try{
           if(!user) {
            
            navigate('/signup')
           }
        }
        catch {

        }
    }
    return(
        <Form onSubmit={premiumApplication}>
        <Form.Group className="m-2" >
            <div className="d-flex">
                <Form.Control type="text" value={firstName} placeholder="Firstname"
                onChange={(e) => {setFirstName(e.target.value)}}/>
                <Form.Control type="text" value={lastName} placeholder="Lastname"
                onChange={(e) => {setLastName(e.target.value)}}/>
            </div>
            <div className="d-flex">
            <Form.Control type="text" value={email} placeholder="Email"
            onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <Form.Label>Resume *pdf</Form.Label>
            <Form.Control type="file" />
            <Form.Control as="textarea" rows={3} placeholder="Additional comments.."/>
        </Form.Group>
        <button className="button-class" type="submit">
            <strong>Apply</strong>
        </button>
    </Form>
    )
}