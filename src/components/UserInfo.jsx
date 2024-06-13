import { Form, Col, Row } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase.js";
export default function UserInfo() {
  const [user, setUser] = useContext(UserContext);
  const [name, setname] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.location || "");
  const [category, setCategory] = useState(user?.category || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [required, setRequired] = useState(false);
  const [fileObj, setFileObj] = useState(null);
  const navigate = useNavigate();

  const array = [
    "Technology",
    "Construction",
    "Healthcare",
    "Aviation",
    "Cosmetology",
    "Automotive",
  ];
  const handleChange = (e) => {
    let file = e.target.files[0];
    setFileObj(file);
  };

  const handleUpload = async () => {
    if (!fileObj) {
      alert("Please select a file to upload.");
      throw new Error("No file selected.");
    }
    
    const toCorrectFormat = fileObj.name.replace(/\s/g, "_").toLowerCase();
    const randomIdentifier = Math.random().toString(36).substring(2, 15);
    const processedName = `${randomIdentifier}_${toCorrectFormat}`;
    
    const storageRef = ref(storage, `avatars/${processedName}`);
    const uploadTask = uploadBytesResumable(storageRef, fileObj);
  
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Avatar URL:", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };
  

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

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!name || !lastName || !bio || !location || !category) {
      alert("Please fill out all required fields");
      setRequired(true);
      return;
    }

    try {
      let avatarUrl = "";
      if (fileObj) {
        avatarUrl = await handleUpload();
      }
  

      const updatedFields = {};
  
      if (name) {
        updatedFields.name = name;
      }
      if (lastName) {
        updatedFields.lastName = lastName;
      }
      
      if (bio) {
        updatedFields.bio = bio;
      }
      
      if (location) {
        updatedFields.location = location;
      }
  
      if (category) {
        updatedFields.category = category;
      }
  
      if (skills) {
        updatedFields.skills = skills;
      }

      if (avatarUrl) {
        updatedFields.avatarUrl = avatarUrl;
      }

    const response = await fetch(`https://boepartners-api.web.app/api/users`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    })
    const data = await response.json();
    if (data.message) {
      alert(data.message);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/profile");
    } 
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
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
              accept="image/*"
              onChange={handleChange}
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
