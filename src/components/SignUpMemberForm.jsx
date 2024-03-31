import { Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";

export default function SignUpMemberForm({endpoint, setUser}) {
  const navigate = useNavigate()
  const [name, setname] = useState('')
  const [website, setWebsite] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [industry, setIndustry] = useState('')
  const [organizationType, setOrganizationType] = useState('')

  const array = ["Technology", "Contruction", "Healthcare", "Aviation", "Fashion", "Automotive"]
  
  const handleGetUser = async(e) => {
      e.preventDefault();
      try {
          const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name, website, organizationType, industry }),
          });
      
          const data = await response.json();
      
          if (data.message) {
            alert(data.message);
            return;
          }
      
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data))
          navigate('/account')
          
        } catch (err) {
          alert(err);
        }
      };
  
  return(
          <Form className="form" onSubmit={handleGetUser}>
            <Form.Group className="m-2" controlId="formBasicName">
                  <Form.Control type="name" value={name} required={true} placeholder="School Name"
                    onChange={(e) => {setname(e.target.value)}}/>
              </Form.Group>
              <Form.Group className="m-2" controlId="formBasicWebsitel">
                  <Form.Control type="website" value={website} required={true} placeholder="Website Url"
                    onChange={(e) => {setWebsite(e.target.value)}}/>
              </Form.Group>
              <Form.Group className="m-2" controlId="formOrganizationType">
                <Form.Select value={organizationType} required={true} onChange={(e) => setOrganizationType(e.target.value)}>
                    <option value="">Select Organization Type</option>
                    <option value="Vocational School">Vocational School</option>
                    <option value="Apprenticeship Program">Apprenticeship Program</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="m-2" controlId="formBasicindustry">
                <Form.Select value={industry} required={true} onChange={(e) => setIndustry(e.target.value)}>
                    <option value="">Select industry</option>
                    {array.map((item, index) => {
                      return <option key={index} value={item}>{item}</option>
                    }
                    )}
                </Form.Select>
              </Form.Group>
              <Form.Group className="m-2" controlId="formBasicEmail">
                  <Form.Control type="email" value={email} required={true} placeholder="Email"
                    onChange={(e) => {setEmail(e.target.value)}}/>
                  <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                  </Form.Text>
              </Form.Group>

              <Form.Group className="m-2" controlId="formBasicPassword">
                  <Form.Control type="password" value={password} placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)} />
                  <Form.Text className="text-muted">
                  Your password must be minimun 8 characters long.
                  </Form.Text>
              </Form.Group>
              <button className="button-class" type="submit">
                  <strong>{endpoint === "signup"? "Sign up" : "Login"}</strong>
              </button>
          </Form>
  )
}