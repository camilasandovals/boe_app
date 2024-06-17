import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { Container } from "react-bootstrap";
import { UserContext } from "../App";

function VerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      verifyToken(token);
    } else {
      setVerificationStatus("Invalid or missing verification token.");
    }
  }, [location]);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(
        `http://localhost:3004/verify?token=${token}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.message) {
        alert(data.message);
        return;
      }
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/profile");
    } catch (error) {
      setVerificationStatus(
        "An error occurred during verification. Please try again later."
      );
    }
  };

  return (
    <AppLayout>
      <Helmet>
        <title>Account Verification - BOE</title>
        <meta name="description" content="Verify your account at Bringing Opportunities Everywhere (BOE). Complete your registration to access more features and opportunities in vocational schools and skilled trades in South Florida." />
      </Helmet>
      <Container className="text-center">
        <h1>Account Verification</h1>
        <p>{verificationStatus}</p>
      </Container>
    </AppLayout>
  );
}

export default VerificationPage;
