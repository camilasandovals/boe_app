import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase.js";

export default function Apply({ program }) {
  const [user, setUser] = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [additionalComments, setAdditionalComments] = useState("");
  const [fileObj, setFileObj] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let file = e.target.files[0];
    setFileObj(file);
  };

  const handleUpload = async (processedName) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `resumes/${processedName}`);
      const uploadTask = uploadBytesResumable(storageRef, fileObj);
  
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
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!fileObj) {
      alert("Please upload a resume.");
      return;
    }
  
    const toCorrectFormat = fileObj.name.replace(/\s/g, "_").toLowerCase();
    const randomIdentifier = Math.random().toString(36).substring(2, 15);
    
    const processedName = `${randomIdentifier}_${toCorrectFormat}`;

    if (!user) {
      alert("Please create an account to apply.");
      navigate("/signup");
      window.scrollTo(0, 0);
      return;
    }
  
    try {
      const url = await handleUpload(processedName);
      
  
      const response = await fetch(
        "http://localhost:3004/premiumApplication",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resumePath: url,
            programId: program,
          }),
        }
      );
  
      const data = await response.json();
      if (data.message) {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the application.");
    }
  };
  



  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <div className="d-flex mb-3">
          <Form.Control
            className="me-2"
            type="text"
            value={name}
            placeholder="First Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Form.Label className="text-start d-block">
          <p>Resume</p>
        </Form.Label>
        <Form.Control
          className="mb-3"
          type="file"
          accept=".pdf"
          onChange={handleChange}
        />
      </Form.Group>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="button-class mt-3" type="submit">
          <strong>Send Application</strong>
        </button>
      </div>
    </Form>
  );
}
