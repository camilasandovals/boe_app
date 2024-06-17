import { Form, Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";

export default function MemberInfo() {
    const [user, setUser] = useContext(UserContext)
    const [name, setname] = useState(user?.name || '')
    const [description, setDescription] = useState(user?.bio || '')
    const [industry, setIndustry] = useState(user?.industry || '')
    const [type, setType] = useState(user?.typeOf || '')
    const [website, setWebsite] = useState(user?.website || '')
    const [required, setRequired] = useState(false)
    const [fileObj, setFileObj] = useState(null);
    
    const navigate = useNavigate()

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

  const handleUpdateUser = async (e) => {
      e.preventDefault();
      if (!name || !description || !industry || !type || !website) {
          alert('Please fill out all required fields');
          setRequired(true);
          return;
      }

      try {

      let logoUrl = "";

      if (fileObj) {
        logoUrl = await handleUpload();
      }

      const updatedFields = {};
      if (name) {
        updatedFields.name = name;
      }
      if (description) {
        updatedFields.description = description;
      }
      if (industry) {
        updatedFields.industry = industry;
      }
      if (type) {
        updatedFields.type = type;
      }
      if (website) {
        updatedFields.website = website;
      }
      if (fileObj) {
        updatedFields.logoUrl = logoUrl;
      }

      const response = await fetch(`http://localhost:3004/api/users`, {
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

    return (
      <>
        <h1 className="text-center">Update Your Account</h1>
        <Form className="form-account" onSubmit={handleUpdateUser}>
          <Form.Group className="mb-3">
            <div className= {!name && required? "text-danger" : "text-muted"}>Required*</div>
            <Form.Control type="text" value={name}  placeholder="School Name"
            onChange={(e) => {setname(e.target.value)}} className="me-2 mb-2"/>
            <div className={!description && required? "text-danger" : "text-muted"}>Required*</div>
            <Form.Control as="textarea" value={description} placeholder="Description"
            onChange={(e) => {setDescription(e.target.value)}} className="me-2 mb-2"/>
            <div className={!industry && required? "text-danger" : "text-muted"}>Required*</div>
            <Form.Select value={industry} onChange={(e) => {setIndustry(e.target.value)}} className="me-2 mb-2">
            <option value="">Select Industry</option>
            <option value="Technology">Technology</option>
            <option value="Construction">Construction</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Aviation">Aviation</option>
            <option value="Cosmetology">Cosmetology</option>
            <option value="Automotive">Automotive</option>

            </Form.Select>
            <div className={!type && required? "text-danger" : "text-muted"}>Required*</div>
            <Form.Select value={type} onChange={(e) => {setType(e.target.value)}} className="me-2 mb-2">
            <option value="">Select Organization Type</option>
            <option value="Apprenticeship Program">Apprenticeship Program</option>
            <option value="Vocational School">Vocational School</option>
            <option value="Trade School">Trade School</option>
            <option value="Technical School">Technical School</option>
            </Form.Select>
            <div className={!website && required? "text-danger" : "text-muted"}>Required*</div>
            <Form.Control type="text" value={website} placeholder="Website"
            onChange={(e) => {setWebsite(e.target.value)}} className="me-2 mb-2"/>
            <Form.Label className="text-start d-block">School Logo</Form.Label>
            <Form.Group className="mb-2" controlId="formBasiclogo">
  
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>

        </Form.Group>
        <button className="button-class" type="submit">
            <strong>Submit</strong>
        </button>
        </Form>
      </>
    )
}
