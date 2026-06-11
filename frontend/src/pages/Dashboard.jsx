import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/tasks", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  if (loading) return <Spinner />;

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div className="stat-card">
          <h2>Total Tasks</h2>
          <p>{total}</p>
        </div>
        <div className="stat-card">
          <h2>Completed</h2>
          <p style={{ color: "#22c55e" }}>{completed}</p>
        </div>
        <div className="stat-card">
          <h2>Pending</h2>
          <p style={{ color: "#f59e0b" }}>{pending}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
