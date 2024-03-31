import UserInfo from "../components/UserInfo";
import AppLayout from "../layout/AppLayout";
import { Form, Col, Row, Button, FormGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import MemberInfo from "../components/MemberInfo";
import Error404 from "./Error404";

export default function AddEntry() {
  const [user, setUser] = useContext(UserContext);
  const [programData, setProgramData] = useState({
    name: '',
    description: '',
    duration: '',
    location: '',
    cost: '',
    financing: ''
  });

  const navigate = useNavigate()
    
  useEffect(() => {
      if (!user) {
          navigate('/');
          return;
      }
  } , [user])

  const handleChange = (e) => {
    setProgramData({ ...programData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/api/programs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.token}`
      },
      body: JSON.stringify(programData)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("Program successfully created");
        navigate('/profile')
        return;
      }
      else {
        alert(data.message)
      }
    }).catch((error) => console.log(error));
    
  }

  return (
      <AppLayout>
          <div className="account">
              { user?.type == "member"? (
                <>
              <h1>Add a new program</h1>
              <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text"
                  name="name"
                  value={programData.name}
                  onChange={handleChange}
                  placeholder="Program Name"
                  required
                />
              </Form.Group>
        
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea"
                  name="description"
                  rows={3}
                  value={programData.description}
                  onChange={handleChange}
                  placeholder="Program Description"
                  required
                />
              </Form.Group>
        
              <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                <Form.Control 
                  type="text"
                  name="duration"
                  value={programData.duration}
                  onChange={handleChange}
                  placeholder="Program Duration"
                  required
                />
              </Form.Group>
        
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Select 
                    aria-label="Default select example" 
                    name="location"
                    onChange={handleChange} 
                    value={programData.location}>
                        <option value="">Select location</option>
                        <option value="Miami Dade">Miami Dade</option>
                        <option value="Broward">Broward</option>
                        <option value="Palm Beach">Palm Beach</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cost (optional)</Form.Label>
                <Form.Control 
                  type="text"
                  name="cost"
                  value={programData.cost}
                  onChange={handleChange}
                  placeholder="Cost"
                />
              </Form.Group>
        
              <Form.Group className="mb-3">
                <Form.Label>Financing Options (optional)</Form.Label>
                <Form.Control 
                  type="text"
                  name="financing"
                  value={programData.financing}
                  onChange={handleChange}
                  placeholder="Financing Options"
                />
              </Form.Group>
        
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            </>
              ) : (
              <Error404 />
              )}
          </div>
      </AppLayout>
  )
}