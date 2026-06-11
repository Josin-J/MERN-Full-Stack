import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/auth/me", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(res.data);
        setUsername(res.data.username);
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await axiosInstance.put(
        "/auth/update",
        { username },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setProfile(res.data);
      toast.success("Profile updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logged out!");
  };

  if (loading) return <Spinner />;

  return (
    <div className="page">
      <h1>Profile</h1>
      <div className="form-card">
        <p style={{ marginBottom: "8px" }}><strong>Email:</strong> {profile?.email}</p>
        <p style={{ marginBottom: "16px", color: "#666", fontSize: "14px" }}>
          <strong>Member since:</strong> {new Date(profile?.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="form-card">
        <h2>Update Username</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={updating}>
            {updating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
      <button onClick={handleLogout} style={{ backgroundColor: "#ef4444", marginTop: "16px" }}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
