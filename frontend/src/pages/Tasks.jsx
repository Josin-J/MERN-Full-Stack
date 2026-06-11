import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import EditTaskForm from "../components/EditTaskForm";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

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
      toast.error("Failed to load tasks");
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
      toast.success("Task created!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await axiosInstance.put(`/tasks/${id}`, taskData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      setEditingTask(null);
      toast.success("Task updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axiosInstance.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted!");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await axiosInstance.patch(`/tasks/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      toast.success("Task status updated!");
    } catch (error) {
      toast.error("Failed to toggle task");
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
    <div className="page">
      <h1>Tasks</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="filter-tabs">
        <button onClick={() => setFilter("all")}>All ({counts.all})</button>
        <button onClick={() => setFilter("pending")}>Pending ({counts.pending})</button>
        <button onClick={() => setFilter("completed")}>Completed ({counts.completed})</button>
        <button onClick={() => setFilter("high")}>High Priority ({counts.high})</button>
      </div>
      <button onClick={() => setShowAddForm(true)}>Add Task</button>

      {showAddForm && (
        <div className="form-card">
          <AddTaskForm onAdd={addTask} onClose={() => setShowAddForm(false)} />
        </div>
      )}

      {editingTask && (
        <div className="form-card">
          <EditTaskForm
            task={editingTask}
            onUpdate={updateTask}
            onClose={() => setEditingTask(null)}
          />
        </div>
      )}

      {tasks.length === 0 && !showAddForm ? (
        <div className="empty-state">
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
