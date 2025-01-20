import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import LoginForm from "../components/LoginForm";
import { UserContext } from "../App";

export default function Login() {
  const [user, setUser] = useContext(UserContext);

  const endpoint = "api/login";
  return (
    <AppLayout>
      <Helmet>
        <title>Login - BOE</title>
        <meta name="description" content="Login to your account at Bringing Opportunities Everywhere (BOE) to access more features and information about vocational schools and academies in South Florida." />
      </Helmet>
      <div className="login">
        <h1>Login</h1>
        <p>Welcome Back!</p>
        <LoginForm endpoint={endpoint} setUser={setUser} />
        <p>
          Don't have an account?{" "}
          <a href="/signup">
            <strong>Sign up</strong>
          </a>
        </p>
      </div>
    </AppLayout>
  );
}
