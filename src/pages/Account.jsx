import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import AppLayout from "../layout/AppLayout";
import { UserContext } from "../App";
import MemberInfo from "../components/MemberInfo";
import Error404 from "./Error404";

export default function Account() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  }, [user]);

  return (
    <AppLayout>
      <Helmet>
        <title>Account - BOE</title>
        <meta name="description" content="Manage your account details and preferences at Bringing Opportunities Everywhere (BOE). Access your information and update your settings." />
      </Helmet>
      <div className="account">
        {user?.type === "user" ? (
          <UserInfo />
        ) : (
          <Error404 />
        )}
      </div>
    </AppLayout>
  );
}
