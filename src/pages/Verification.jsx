import React, { useContext, useEffect, useState } from "react";
import { App } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
        `https://api.boepartners/verify?token=${token}`,
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
      <Container className="text-center">
        <h2>Account Verification</h2>
        <p>{verificationStatus}</p>
      </Container>
    </AppLayout>
  );
}

export default VerificationPage;
