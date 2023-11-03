import { useContext, useState } from "react"
import { Form } from "react-bootstrap";
import SignModal from "./SignModal";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Apply({school, program}) {
    const [user, setUser] = useContext(UserContext)
    const [firstName, setFirstName] = useState(user && user.firstName ? user.firstName : '')
    const [lastName, setLastName] = useState(user && user.lastName ? user.lastName : '')
    const [email, setEmail] = useState(user && user.email ? user.email : '')
    const [additionalComments, setAdditionalComments] = useState('')
    const [resume, setResume] = useState('')
    const navigate = useNavigate('')

    const premiumApplication = async(e) => {
        e.preventDefault()
    
        try{
           if(!user) {
            navigate('/signup')
            return
           }
              const response = await fetch('https://boepartners-api.web.app/premiumApplication', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({school, program, firstName, lastName, email, additionalComments, resume})
            })
            const data = await response.json()
            if(data.message) {
                alert(data.message)
                return
            }
            alert('Application submitted')
        }
        catch (error) {
            console.error(error);
            alert('An error occurred while submitting the application.');
          }          
    }
    return(
        <Form onSubmit={premiumApplication}>
        <Form.Group className="m-2">
            <div className="d-flex mb-3">
                <Form.Control className="me-2" type="text" value={firstName} 
                placeholder={user && user.firstName ? user.firstName : "Firstname"}
                onChange={(e) => {setFirstName(e.target.value)}}/>
                <Form.Control type="text" value={lastName} 
                placeholder={user && user.lastName ? user.lastName : "Lastname"}
                onChange={(e) => {setLastName(e.target.value)}}/>
            </div>
            <div className="mb-3">
            <Form.Control 
                type="text" 
                value={email} 
                placeholder={user && user.email ? user.email : "Email"}
                onChange={(e) => {setEmail(e.target.value)}}
            />
            </div>
            {/* <Form.Label className="text-start d-block"><p>Resume *pdf</p></Form.Label>
            <Form.Control className="mb-3" type="file" onChange={(e) => setResume(e.target.files[0])} /> */}
            <Form.Control as="textarea" rows={3} placeholder="Additional comments.."
            onChange={(e) => {setAdditionalComments(e.target.value)}}/>
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="button-class mt-3" type="submit">
                <strong>Apply</strong>
            </button>
        </div>
    </Form>
    )
}
