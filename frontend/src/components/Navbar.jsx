import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchProfile = async () => {
        try {
          const res = await axiosInstance.get("/auth/me", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setUsername(res.data.username);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }
  }, [isAuthenticated, user]);

  const getInitial = () => {
    return username ? username.charAt(0).toUpperCase() : "?";
  };

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <Link to="/profile">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#555",
                color: "white",
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              {getInitial()}
            </span>
            Profile
          </Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/tasks">Tasks</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
