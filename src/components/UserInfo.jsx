import { Form, Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
const [user, setUser] = useContext(UserContext)
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [bio, setBio] = useState('')
const [city, setCity] = useState('')
const [state, setState] = useState('')
const [category, setCategory] = useState('')
const [skills, setSkills] = useState([])
const navigate = useNavigate()

const array = ["Technology", "Contruction", "Healthcare", "Aviation", "Fashion", "Automotive"]

const handleUpdateUser = (e) => {
    e.preventDefault();
  
    const updatedFields = {};
  
    if (firstName) {
      updatedFields.firstName = firstName;
    }
    if (lastName) {
      updatedFields.lastName = lastName;
    }
    
    if (bio) {
      updatedFields.bio = bio;
    }
    
    if (city) {
      updatedFields.city = city;
    }

    if (state) {
      updatedFields.state = state;
    }
  
    if (category) {
      updatedFields.category = category;
    }

    if (skills) {
      updatedFields.skills = skills;
    }

    fetch(`http://localhost:3000/api/users?email=${user.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          return;
        }
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data))
      })
      .catch(alert);
      navigate('/')
  };


const handleCheckboxChange = (event) => {
  if (event.target.checked) {
      setSkills([...skills, event.target.value]);
  } else {
      setSkills(skills.filter(skill => skill !== event.target.value));
  }
};


    return (
        <Form className="form-account" onSubmit={handleUpdateUser}>
            <Form.Group className="m-2">
                <div className="d-flex">
                    <Form.Control type="text" value={firstName} required={true} placeholder="Firstname"
                    onChange={(e) => {setFirstName(e.target.value)}}/>
                    <Form.Control type="text" value={lastName} required={true} placeholder="Lastname"
                    onChange={(e) => {setLastName(e.target.value)}}/>
                </div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={3} placeholder="Tell us about yourself..."
                onChange={(e) => {setBio(e.target.value)}}/>
                </Form.Group>
                <div className="d-flex">
                <Form.Control type="text" value={city} required={true} placeholder="City"
                onChange={(e) => {setCity(e.target.value)}}/>
                <Form.Select aria-label="Default select example" onChange={(e) => setState(e.target.value)}>
                <option value="">Select state</option>
                <option value="Florida">Florida</option>
                </Form.Select>
                </div>
                Select the reason that best describes why you're creating a BOE account
                <Form.Select aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select category</option>
                <option value="I'm seeking a job">I'm seeking a job</option>
                <option value="I'm just browsing">I'm just browsing</option>
                <option value="I work at an organization that helps people with job placement or career search">I work at an organization that helps people with job placement or career search</option>
                <option value="I know someone that might be interested">I know someone that might be interested</option>
                </Form.Select>
                Areas of interest
                <Row>
                    {array.map((type, index) => (
                    <Col xs={4} key={index}>
                        <Form.Check
                          inline
                          label={type}
                          name="group1"
                          type="checkbox"
                          id={`inline-checkbox-${index}`}
                          value={type}
                          onChange={handleCheckboxChange}
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