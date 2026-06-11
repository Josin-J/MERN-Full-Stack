import { useState } from "react";

const AddTaskForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(formData);
    setFormData({ title: "", description: "", priority: "medium", dueDate: "" });
    setLoading(false);
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
        <button type="button" onClick={onClose} disabled={loading} style={{ marginLeft: "8px", backgroundColor: "#666" }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
