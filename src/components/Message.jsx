import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Message({ school }) {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState(user?.email || "");
  const [additionalComments, setAdditionalComments] = useState("");
  const navigate = useNavigate();

  const handleCommentsChange = (e) => {
    const input = e.target.value;
    if (input.length <= 200) {
      setAdditionalComments(input);
    } else {
      alert("Maximum character limit of 200 exceeded.");
    }
  };

  const premiumApplication = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/signup");
      alert("Please create account to apply");
      return;
    }

    try {
      const response = await fetch("https://api.boepartners/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          recipient: school,
          sender: email,
          message: additionalComments,
        }),
      });

      const data = await response.json();
      if (data.message) {
        alert(data.message);
        return;
      }
      alert("Message submitted");
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  return (
    <>
      <Form onSubmit={premiumApplication}>
        <Form.Group className="m-2 mt-4">
          <Form.Control
            className="mb-3"
            type="text"
            value={email}
            placeholder={user && user.email ? user.email : "Email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Message school.."
            value={additionalComments}
            onChange={handleCommentsChange}
          />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="button-class mt-3" type="submit">
            <strong>Send Message</strong>
          </button>
        </div>
      </Form>
    </>
  );
}
