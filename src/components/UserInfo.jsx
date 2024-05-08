import { Form, Col, Row } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const [user, setUser] = useContext(UserContext);
  const [name, setname] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.location || "");
  const [category, setCategory] = useState(user?.category || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [required, setRequired] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const array = [
    "Technology",
    "Construction",
    "Healthcare",
    "Aviation",
    "Fashion",
    "Automotive",
  ];

  const handleBioChange = (event) => {
    const words = event.target.value.split(" ");
    if (words.length <= 100) {
      setBio(event.target.value);
    } else {
      const shortenedBio = words.slice(0, 100).join(" ");
      setBio(shortenedBio);
      alert("Bio must be less than 100 words");
    }
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!name || !lastName || !bio || !location || !category) {
      alert("Please fill out all required fields");
      setRequired(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("category", category);

    skills.forEach((skill) => {
      formData.append("skills[]", skill);
    });

    if (avatar) {
      formData.append("avatar", avatar);
    }

    fetch(`https://boepartners-api.web.app/api/users`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/profile");
          return;
        }
      })
      .catch(alert);
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSkills([...skills, event.target.value]);
    } else {
      setSkills(skills.filter((skill) => skill !== event.target.value));
    }
  };

  return (
    <>
      <h1>Update your profile</h1>
      <Form
        className="form-account"
        onSubmit={handleUpdateUser}
        encType="multipart/form-data"
      >
        <Form.Group className="mb-3">
          <div className={!name && required ? "text-danger" : "text-muted"}>
            Required*
          </div>
          <Form.Control
            type="text"
            value={name}
            placeholder="First Name"
            onChange={(e) => {
              setname(e.target.value);
            }}
            className="me-2 mb-2"
          />
          <div className={!lastName && required ? "text-danger" : "text-muted"}>
            Required*
          </div>
          <Form.Control
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            className="mb-3"
          />
          {/* <Form.Group controlId="formBasicAvatar">
            <Form.Control
              type="file"
              id="fileUpload"
              style={{ display: 'none' }}
              onChange={(e) => setAvatar(e.target.files[0].name)}
              className="mb-2"
            />

            <button className="update-file-button">
              Select an Avatar
            </button>

            <span style={{ marginLeft: '10px', color: 'lightgray' }}>
              {avatar ? avatar : 'No avatar selected'}
            </span>
          </Form.Group> */}

          
          <Form.Label className="text-start d-block">
            <p>Profile Picture</p>
          </Form.Label>
          <Form.Group className="m-2" controlId="formBasicAvatar">
            <Form.Control
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            
          </Form.Group>

          <div className={!bio && required ? "text-danger" : "text-muted"}>
            Required*
          </div>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Tell us about yourself..."
            onChange={handleBioChange}
            value={bio}
            className="mb-2"
          />
          <div className={!location && required ? "text-danger" : "text-muted"}>
            Required*
          </div>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            <option value="">Select Location</option>
            <option value="Miami Dade">Miami Dade</option>
            <option value="Broward">Broward</option>
            <option value="Palm Beach">Palm Beach</option>
          </Form.Select>


          <Form.Label className="d-block">
            <p>Select the reason that best describes why you're creating a BOE
          account:</p>
          </Form.Label>
          <div className={!category && required ? "text-danger" : "text-muted"}>
            Required*
          </div>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setCategory(e.target.value)}
            className="mb-4"
            value={category}
          >
            <option value="">Select category</option>
            <option value="Actively seeking a job">
              Actively seeking a job
            </option>
            <option value="Friend or family member actively seeking a job">
              Friend or family member actively seeking a job
            </option>
            <option value="Work at a non-profit, school, or any organization that helps with job placement">
              Work at a non-profit, school, or any organization that helps with
              job placement
            </option>
            <option value="Just browsing">Just browsing</option>
          </Form.Select>
          Areas of interest:
          <Row>
            {array.map((type, index) => (
              <Col xs={4} key={index}>
                <Form.Check
                  className="m-2"
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
        <button className="button-class" type="submit">
          <strong>Submit</strong>
        </button>
      </Form>
    </>
  );
}
