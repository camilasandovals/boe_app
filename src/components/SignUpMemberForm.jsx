import { Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase.js";

export default function SignUpMemberForm({ endpoint, setUser }) {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [industry, setIndustry] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [description, setDescription] = useState("");
  const [fileObj, setFileObj] = useState(null);
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

  const handleUpload = async (processedName) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `logos/${processedName}`);
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

    try {
    if (!fileObj) {
      alert("Please upload a logo.");
      return;
    }

    const toCorrectFormat = fileObj.name.replace(/\s/g, "_").toLowerCase();
    const randomIdentifier = Math.random().toString(36).substring(2, 15);
    const processedName = `${randomIdentifier}_${toCorrectFormat}`;
    
    try {

      const logoUrl = await handleUpload(processedName);
      const response = await fetch(
        `https://boepartners-api.web.app/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            website,
            industry,
            organizationType,
            description,
            logoUrl,
          }),
        }
      );

      const data = await response.json();

      if (data.message) {
        alert(data.message);
        return;
      }
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  }
  catch (error) {
    console.error(error);
  }
}

  return (
    <Form
      className="form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <Form.Group className="m-2" controlId="formBasicName">
        <Form.Control
          type="name"
          value={name}
          required={true}
          placeholder="School Name"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="m-2" controlId="formBasicDescription">
        <Form.Control
          as="textarea"
          type="description"
          value={description}
          required={true}
          placeholder="School Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Label className="text-start d-block">
            <p>Upload School Logo</p>
          </Form.Label>
      <Form.Group className="mb-2" controlId="formBasiclogo">
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="m-2" controlId="formBasicWebsitel">
        <Form.Control
          type="website"
          value={website}
          required={true}
          placeholder="Website Url"
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="m-2" controlId="formOrganizationType">
        <Form.Select
          value={organizationType}
          required={true}
          onChange={(e) => setOrganizationType(e.target.value)}
        >
          <option value="">Select Organization Type</option>
          <option value="Vocational School">Vocational School</option>
          <option value="Apprenticeship Program">Apprenticeship Program</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="m-2" controlId="formBasicindustry">
        <Form.Select
          value={industry}
          required={true}
          onChange={(e) => setIndustry(e.target.value)}
        >
          <option value="">Select industry</option>
          {array.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="m-2" controlId="formBasicEmail">
        <Form.Control
          type="email"
          value={email}
          required={true}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="m-2" controlId="formBasicPassword">
        <Form.Control
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Text className="text-muted">
          Your password must be minimun 8 characters long.
        </Form.Text>
      </Form.Group>
      <button className="button-class" type="submit">
        <strong>{endpoint === "signup" ? "Sign up" : "Login"}</strong>
      </button>
    </Form>
  );
}
