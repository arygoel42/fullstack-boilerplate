import React from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

const Home: React.FC = () => {
  const { user, isLoggedIn, logout } = useCurrentUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {isLoggedIn ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Welcome, {user?.displayName}!</h1>
            <button
              onClick={logout}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
          <p>This is the home page of your application.</p>
          <p>You've successfully logged in with Google!</p>
        </>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
};

export default Home;
