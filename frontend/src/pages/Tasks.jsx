import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import EditTaskForm from "../components/EditTaskForm";
import Spinner from "../components/Spinner";

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const addTask = async (taskData) => {
    try {
      const res = await axiosInstance.post("/tasks", taskData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks([...tasks, res.data]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await axiosInstance.put(`/tasks/${id}`, taskData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axiosInstance.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await axiosInstance.patch(`/tasks/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  if (loading) return <Spinner />;

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    high: tasks.filter((t) => t.priority === "high").length,
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => {
      if (filter === "pending") return task.status === "pending";
      if (filter === "completed") return task.status === "completed";
      if (filter === "high") return task.priority === "high";
      return true;
    });

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <button onClick={() => setFilter("all")}>All ({counts.all})</button>
        <button onClick={() => setFilter("pending")}>Pending ({counts.pending})</button>
        <button onClick={() => setFilter("completed")}>Completed ({counts.completed})</button>
        <button onClick={() => setFilter("high")}>High Priority ({counts.high})</button>
      </div>
      <button onClick={() => setShowAddForm(true)}>Add Task</button>

      {showAddForm && (
        <AddTaskForm onAdd={addTask} onClose={() => setShowAddForm(false)} />
      )}

      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onUpdate={updateTask}
          onClose={() => setEditingTask(null)}
        />
      )}

      {tasks.length === 0 && !showAddForm ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h2>No tasks yet</h2>
          <p>Create your first task to get started!</p>
        </div>
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={setEditingTask}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
