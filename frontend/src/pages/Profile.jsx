import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../components/Spinner";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/auth/me", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(res.data);
        setUsername(res.data.username);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axiosInstance.put(
        "/auth/update",
        { username },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setProfile(res.data);
      setMessage("Profile updated!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating profile");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1>Profile</h1>
      {message && <p>{message}</p>}
      <div>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Member since:</strong> {new Date(profile?.createdAt).toLocaleDateString()}</p>
      </div>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
