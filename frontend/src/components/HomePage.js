// TODO: Create a home page for the Bear Bazaar
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Transact from "./Transact";

function HomePage() {
  const { isLoggedIn, logout } = useAuth();
  let navigate = useNavigate();

  function handleLoginClick() {
    navigate("/auth");
  }

  return (
    // FIXME: temporary style
    <div className="auth-container-outer">
      {isLoggedIn ? (
        <div>
          <h1>Welcome back!</h1>
          <button onClick={logout}>Logout</button>
          <Transact />
        </div>
      ) : (
        <div>
          <h1>Please log in.</h1>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
