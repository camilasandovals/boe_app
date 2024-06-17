import { Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ endpoint, setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGetUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3004/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.message) {
        alert(data.message);
        return;
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user.name && data.type === "user") {
        navigate("/account");
        return;
      }
      if (data.type === "member") {
        navigate("/profile");
        return;
      }
      navigate("/");

    } catch (err) {
      alert(err);
    }
  };

  return (
    <Form className="form" onSubmit={handleGetUser}>
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
