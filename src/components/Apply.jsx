import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Apply({ program }) {
  const [user, setUser] = useContext(UserContext);
  const [name, setname] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [additionalComments, setAdditionalComments] = useState("");
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const premiumApplication = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/signup");
      window.scrollTo(0, 0);
      alert("Please create account to apply");
      return;
    }

    const formData = new FormData();

    formData.append("programId", program);
    formData.append("userId", user.id);
    formData.append("resume", resume);

    try {
      const response = await fetch("http://localhost:3002/premiumApplication", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData, // no 'Content-Type' header
      });

      const data = await response.json();
      if (data.message) {
        alert(data.message);
        return;
      }
      alert("Application submitted");
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the application.");
    }
  };

  return (
    <>
      <Form onSubmit={premiumApplication}>
        <Form.Group className="mb-2">
          <div className="d-flex mb-3">
            <Form.Control
              className="me-2"
              type="text"
              value={name}
              placeholder={user && user?.name ? user.name : "name"}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <Form.Control
              type="text"
              value={lastName}
              placeholder={user && user.lastName ? user.lastName : "Lastname"}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Form.Control
              type="text"
              value={email}
              placeholder={user && user.email ? user.email : "Email"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <Form.Label className="text-start d-block">
            <p>Resume</p>
          </Form.Label>
          <Form.Control
            className="mb-3"
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="button-class mt-3" type="submit">
            <strong>Send Application</strong>
          </button>
        </div>
      </Form>
    </>
  );
}
