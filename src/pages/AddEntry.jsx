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
  const [required, setRequired] = useState(false);
  const [programData, setProgramData] = useState({
    name: "",
    description: "",
    duration: "",
    location: "",
    cost: "",
    financing: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [user]);

  const handleChange = (e) => {
    setProgramData({ ...programData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!programData.name) {
      alert("Please fill out all required fields");
      setRequired(true);
      return;
    }

    const response = await fetch(
      `https://boepartners-api.web.app/api/programs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(programData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Program successfully created");
          navigate("/profile");
          return;
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <AppLayout>
      <div className="account">
        {user?.type == "member" ? (
          <>
            <h1>Add a new program</h1>
            <Form onSubmit={handleFormSubmit} className="form-account">
              <Form.Group className="mb-3">
                <div
                  className={
                    !programData.name && required ? "text-danger" : "text-muted"
                  }
                >
                  Required*
                </div>
                <Form.Control
                  type="text"
                  name="name"
                  value={programData.name}
                  onChange={handleChange}
                  placeholder="Program Name"
                  required
                  className="me-2 mb-2"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <div
                  className={
                    !programData.description && required
                      ? "text-danger"
                      : "text-muted"
                  }
                >
                  Required*
                </div>
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
                <Form.Select
                  aria-label="Default select example"
                  name="location"
                  onChange={handleChange}
                  value={programData.location}
                  required
                >
                  <option value="">Select Location</option>
                  <option value="Miami Dade">Miami Dade</option>
                  <option value="Broward">Broward</option>
                  <option value="Palm Beach">Palm Beach</option>
                  <option value="Online">Online</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  name="cost"
                  value={programData.cost}
                  onChange={handleChange}
                  placeholder="Cost"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select
                  name="financing"
                  value={programData.financing}
                  onChange={handleChange}
                >
                  <option value="">Select Financing Options</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </Form.Group>

              <button className="button-class" type="submit">
                <strong>Submit</strong>
              </button>
            </Form>
          </>
        ) : (
          <Error404 />
        )}
      </div>
    </AppLayout>
  );
}
