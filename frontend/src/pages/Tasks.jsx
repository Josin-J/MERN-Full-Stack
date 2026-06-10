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

  if (loading) return <Spinner />;

  return (
    <div>
      <h1>Tasks</h1>
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
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
