import { Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpMemberForm({ endpoint, setUser }) {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [industry, setIndustry] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  const array = [
    "Technology",
    "Contruction",
    "Healthcare",
    "Aviation",
    "Fashion",
    "Automotive",
  ];

  const handleGetUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("website", website);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("organizationType", organizationType);
    formData.append("industry", industry);
    formData.append("description", description);
    formData.append("logo", logo); // Ensure this is the file object

    try {
      const response = await fetch(`http://localhost:3002/${endpoint}`, {
        method: "POST",
        body: formData, // Use FormData directly without JSON.stringify
      });

      const data = await response.json();

      if (data.message) {
        alert(data.message);
        return;
      }
      navigate("/profile");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Form
      className="form"
      onSubmit={handleGetUser}
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
      <Form.Group className="m-2" controlId="formBasiclogo">
        <Form.Control
          type="file"
          onChange={(e) => setLogo(e.target.files[0])}
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
