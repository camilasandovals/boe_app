import { Form, Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const [user, setUser] = useContext(UserContext)
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [city, setCity] = useState(user?.city || '')
  const [state, setState] = useState(user?.state || '')
  const [category, setCategory] = useState(user?.category || '')
  const [skills, setSkills] = useState(user?.skills || [])
  const navigate = useNavigate()

const array = ["Technology", "Contruction", "Healthcare", "Aviation", "Fashion", "Automotive"]

const handleBioChange = (event) => {
  const words = event.target.value.split(' ');

  if (words.length <= 100) {
    setBio(event.target.value);
  } else { 
    const shortenedBio = words.slice(0, 100).join(' ');
    setBio(shortenedBio);
    alert('Bio must be less than 100 words')
  }
};


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

    fetch(`https://boepartners-api.web.app/api/users?email=${user.email}`, {
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
      navigate('/profile')
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
        <Form.Group className="mb-3">
            <div className="d-flex justify-content-between">
                <Form.Control type="text" value={firstName}  placeholder="Firstname"
                onChange={(e) => {setFirstName(e.target.value)}} className="me-2"/>
                <Form.Control type="text" value={lastName} placeholder="Lastname"
                onChange={(e) => {setLastName(e.target.value)}}/>
            </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={3} placeholder="Tell us about yourself..." 
          onChange={handleBioChange} value={bio} />
        </Form.Group>
        <Form.Group className="mb-3">
            <div className="d-flex justify-content-between">
            <Form.Control type="text" value={city}  placeholder="City"
            onChange={(e) => {setCity(e.target.value)}} className="me-2"/>
            <Form.Select 
                aria-label="Default select example" 
                onChange={(e) => setState(e.target.value)} 
                value={state}>
                    <option value="">Select state</option>
                    <option value="Florida">Florida</option>
            </Form.Select>
            </div>
        </Form.Group>
        <Form.Group className="mb-3">
            <p>Select the reason that best describes why you're creating a BOE account</p>
            <Form.Select 
              aria-label="Default select example" 
              onChange={(e) => setCategory(e.target.value)} 
              value={category}>
                  <option value="">Select category</option>
                  <option value="I'm seeking a job">I'm seeking a job</option>
                  <option value="I'm just browsing">I'm just browsing</option>
                  <option value="I work at an organization that helps people with job placement or career search">I work at an organization that helps people with job placement or career search</option>
                  <option value="I know someone that might be interested">I know someone that might be interested</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <p>Areas of interest</p>
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
                  checked={skills.includes(type)}
                />
              </Col>
            ))}
            </Row>
        </Form.Group>
        <Form.Group className="mb-3">
        <button className="button-class" type="submit">
            <strong>Submit</strong>
        </button>
        </Form.Group>
    </Form>
  )
}